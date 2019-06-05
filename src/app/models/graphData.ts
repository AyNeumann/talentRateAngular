export class GraphData {
    constructor(
        public name: string,
        public value: number
    ) {}
}

export class MutliStackedGraphData {
    constructor(
        public name: string,
        public serie: GraphData[]
    ) {}
}
