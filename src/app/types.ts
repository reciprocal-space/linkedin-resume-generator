export interface Position {
    title: string | null
    tenure: string | null
    description: string | null
};

export interface WorkExperienceProps extends Position {
    company: string
}

export interface WorkExperience {
    company: string | null
    positions: Position[]
};

export interface Info {
    name: string
    profilePictureLink: string
}

export interface Education {
    university: string,
    degree: string
    years: string
    description: string
}

export interface ScrapedResult {
    info: Info
    education: Education[]
    experience: WorkExperience[]
}