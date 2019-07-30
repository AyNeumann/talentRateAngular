import { Student } from './student';

export class Eval {
    constructor(
        public evalId: string,
        public school: string,
        public promotion: string,
        public module: string,
        public category: string,
        public skill: string,
        public homework: string,
        public student: Student,
        public score: number,
        public obtainable: number,
        public given: number
    ) { }
}

export class ReturnedEval {
    constructor(
        public evalId: string,
        public school: string,
        public promotion: string,
        public module: string,
        public category: string,
        public skill: string,
        public homework: string,
        public student: Student,
        public score: number,
        public obtainable: number,
        public given: number,
        public isDone: boolean,
        public message: string
    ) { }
}

export interface IEval {
    evalId: string;
    school: string;
    promotion: string;
    module: string;
    category: string;
    skill: string;
    homework: string;
    student: Student;
    score: number;
    obtainable: number;
    given: number;
}


