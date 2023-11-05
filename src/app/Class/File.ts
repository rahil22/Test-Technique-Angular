export class File {
    id!: number;
    photo!: string;
    author!: string;
    text!: () => Promise<string>;  }