import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  @ViewChild("container1", { read: ViewContainerRef })
  container1: ViewContainerRef;
  @ViewChild("container2", { read: ViewContainerRef })
  container2: ViewContainerRef;
  constructor(private cfr: ComponentFactoryResolver) {
    import("./app.component").then(
      ({ AppTest1Component, AppTest2Component }) => {
        this.container1.createComponent(
          this.cfr.resolveComponentFactory(AppTest1Component)
        );
        this.container2.createComponent(
          this.cfr.resolveComponentFactory(AppTest2Component)
        );
      }
    );
  }

  afterViewLoaded() {
    console.log("View Loaded", this);
  }
}

@withTheme()
@Component({
  selector: "app-test1",
  template: `
    <b [style.color]="theme?.palette?.red"
      >My display color is {{ theme?.palette?.red }}</b
    >
  `,
  styles: []
})
export class AppTest1Component {}

@withTheme()
@Component({
  selector: "app-test2",
  template: `
    <b [style.color]="theme?.palette?.purple"
      >My display color is {{ theme?.palette?.purple }}</b
    >
  `,
  styles: []
})
export class AppTest2Component {}

export function withTheme() {
  return cmpType => {
    const originalFactory = cmpType.ɵfac;
    cmpType.ɵcmp.factory = (...args: any) => {
      const cmp: any = originalFactory(...args);
      cmp.theme = {
        palette: {
          red: "red",
          black: "black",
          yellow: "yellow",
          white: "white",
          purple: "rebeccapurple"
        },
        spacing: {
          xxs: 4,
          xs: 8,
          sm: 12,
          md: 20,
          lg: 32,
          xl: 52,
          xxl: 84
        }
      };
      return cmp;
    };
    return cmpType;
  };
}
