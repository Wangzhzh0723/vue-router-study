import BaseHistory from "./base"

export default class BrowserHistory extends BaseHistory {
  constructor(router) {
    super(router)
  }
  getCurrentLocation() {}
}
