import { Student } from './student';

export class Eval {
    constructor(
        public id: string,
        public school: string,
        public promotion: string,
        public module: string,
        public category: string,
        public skill: string,
        public homework: string,
        public student: Student,
        public score: string,
        public obtainable: string
    ) { }

}

