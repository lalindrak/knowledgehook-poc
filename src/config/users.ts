export interface IUserData {
    username: string;
    password: string;
}

export const users: { [key: string]: IUserData } = {
    TEACHER: {
        username: process.env.TEACHER_USERNAME || '',
        password: process.env.TEACHER_PASSWORD || '',
    },
    STUDENT: {
        username: process.env.STUDENT_USERNAME || '',
        password: process.env.STUDENT_PASSWORD || '',
    },
};
