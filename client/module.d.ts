declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.module.less" {
  const classes: { [className: string]: string };
  export default classes;
}

declare module "*.png";
