declare module '*.svg' {
    const content: string;
    export = content;
}

declare module '*.png';
declare module '*.jpg';
declare module '*.md';

declare module '*.postcss' {
    interface IClassNames {
        [className: string]: string;
    }
    const classNames: IClassNames;
    export = classNames;
}
