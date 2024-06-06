'use server';

import puppeteer from 'puppeteer';

import { Position, WorkExperience, Info, Education, ScrapedResult } from '../types';

export const scrapeLinkedInProfile = async (url: string, sessionCookieValue: string = process.env.SESSION_COOKIE!): Promise<ScrapedResult> => {

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--lang=en-GB",
            "--no-sandbox",
            "--disable-setuid-sandbox",
            "--disable-gpu",
            "--disable-dev-shm-usage",
        ],
        defaultViewport: null,
        pipe: true,
        slowMo: 30,
    });

    const page = (await browser.pages())[0];

    await page.setCookie({
        'name': 'li_at',
        'value': sessionCookieValue,
        'domain': '.www.linkedin.com'
    })

    const scrapeExperiences = async (url: string): Promise<WorkExperience[]> => {
        await page.goto(url)

        const experienceQuerySelector = '.artdeco-card.pb3';
        await page.waitForSelector(experienceQuerySelector);
        const experiences = await page.$$eval(experienceQuerySelector, card => {
            const selectFromParentNode = (parent: Element, query: string) => {
                return Array
                    .from(
                        parent.querySelectorAll(query)
                    )
            }
        
            const selectPositionDetails = (node: Element, query: string) => {
                return node!
                    .querySelector(query)!
                    .querySelector('.visually-hidden')!
                    .textContent
            }
        
            const getCompanyNodes = (parent: Element) => {
                const query = '.pvs-list__paged-list-item.artdeco-list__item.pvs-list__item--line-separated.pvs-list__item--one-column'
                return selectFromParentNode(parent, query)
            }
        
            const getPositionDetails = (parent: Element) => {
                const hadMultiplePositions = selectFromParentNode(parent, '.scaffold-finite-scroll__content').length > 0
                if (hadMultiplePositions) {
                    const company = selectPositionDetails(parent, '.display-flex.flex-wrap.align-items-center.full-height')
                    const positions = selectFromParentNode(parent, '.pvs-list__paged-list-item.pvs-list__item--one-column')
                        .map(node => {
                            const title = selectPositionDetails(node, '.display-flex.flex-wrap.align-items-center.full-height')
                            const tenure = selectPositionDetails(node, '.t-14.t-normal.t-black--light')
                            const description = selectPositionDetails(node, '.pvs-entity__sub-components')
                            return { title, tenure, description }
                        })
                    return { company, positions }
                    
                }
                const title = selectPositionDetails(parent, '.display-flex.flex-wrap.align-items-center.full-height')
                const company = selectPositionDetails(parent, '.t-14.t-normal')
                const tenure = selectPositionDetails(parent, '.t-14.t-normal.t-black--light')
                const description = selectPositionDetails(parent, '.pvs-entity__sub-components')
                return { company, positions: [{ title, tenure, description }] }
            }

            const companies = getCompanyNodes(card[0])
            const positions = companies.map(company => getPositionDetails(company))
            return positions
        });
        return experiences
    }

    const scrapeEducation = async (url: string): Promise<Education[]> => {
        await page.goto(url);

        const educationQuerySelector = '.pvs-list__paged-list-item.artdeco-list__item.pvs-list__item--line-separated.pvs-list__item--one-column';
        await page.waitForSelector(educationQuerySelector)
        return await page.$$eval(educationQuerySelector, (nodes) => {
            return nodes.map((node) => {
                const university = node.querySelector('.display-flex.flex-wrap.align-items-center.full-height')!.querySelector('.visually-hidden')!.textContent!;
                const degree = node.querySelector('.t-14.t-normal')!.querySelector('.visually-hidden')!.textContent!;
                const years = node.querySelector('.t-14.t-normal.t-black--light')!.querySelector('.visually-hidden')!.textContent!;
                const  description = node.querySelector('.pvs-entity__sub-components')!.querySelector('.visually-hidden')!.textContent!;

                return { university, degree, years, description }
            })
        });
    }

    const scrapeProfileInfo = async (url: string): Promise<Info> => {
        await page.goto(url)

        const nameSelector = 'h1';
        const name = await page.$$eval(nameSelector, nodes => nodes[0].innerText);

        const profilePictureSelector = '.profile-photo-edit__edit-btn';
        const profilePictureElement = await page.$$eval(profilePictureSelector, nodes => nodes[0].children[0] )
        const profilePictureLink = (profilePictureElement as HTMLImageElement).src

        return { name, profilePictureLink };
    }

    const educationUrl = url + '/details/education'
    const experienceUrl = url + '/details/experience'
    return { 
        info: await scrapeProfileInfo(url), 
        education: await scrapeEducation(educationUrl), 
        experience: await scrapeExperiences(experienceUrl) 
    }
}