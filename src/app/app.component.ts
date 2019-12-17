import {
  Component,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { css } from "emotion";

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

@withStyles({
  border: "2px solid red",
  color: "orange",
  padding: "15px 32px",
  textAlign: "center",
  textDecoration: "none",
  display: "inline-block",
  fontSize: "16px",
  margin: "4px 2px",
  cursor: "pointer"
})
@withTheme()
@Component({
  selector: "app-test1",
  template: `
    <div class="{{ this.className }}">
      <b [style.color]="theme?.palette?.red"
        >My display color is {{ theme?.palette?.red }}</b
      >
    </div>
  `,
  styles: []
})
export class AppTest1Component {}

@withStyles({
  border: "2px solid red",
  color: "black",
  padding: "15px 32px",
  textAlign: "center",
  backgroundColor: "yellow"
})
@withTheme()
@Component({
  selector: "app-test2",
  template: `
    <div class="{{ this.className }}">
      <b [style.color]="theme?.palette?.purple"
        >My display color is {{ theme?.palette?.purple }}</b
      >
    </div>
  `,
  styles: []
})
export class AppTest2Component {
  constructor() {
    console.log(this);
  }
}

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

export function withStyles(customStyles) {
  return cmpType => {
    const originalFactory = cmpType.ɵfac;
    cmpType.ɵcmp.factory = (...args: any) => {
      const cmp: any = originalFactory(...args);
      const styles = css([{ ...customStyles }]);
      cmp.className = styles;

      return cmp;
    };
    return cmpType;
  };
}
