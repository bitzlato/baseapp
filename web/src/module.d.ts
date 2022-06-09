declare module 'web/src/assets/svg/*.svg' {
  import React from 'react';

  const SVG: React.VFC<React.SVGProps<SVGSVGElement>>;
  export default SVG;
}

declare module 'src/*.svg' {
  const content: string;
  export = content;
}

declare module './*.svg' {
  const content: string;
  export = content;
}

declare module '*.png';
declare module '*.jpg';

declare module '*.postcss' {
  interface IClassNames {
    [className: string]: any;
  }
  const classNames: IClassNames;
  export = classNames;
}

declare module 'react-maskinput' {
  const Component: any;
  export = Component;
}

declare module 'react-fade-in' {
  const Component: any;
  export = Component;
}
