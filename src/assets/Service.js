import { xml2js } from 'xml-js'
import moment from 'moment'

export default class Service {

  constructor (service) {
    this.id = service._attributes.id
    this.name = service._attributes.ServiceName

    this.stats = {}

    for (var k in service.Stats) {
      this.stats[k] = service.Stats[k]._text
    }
  }

  get customersInLine () {
    return parseInt(this.stats.PeopleWaiting)
  }

  get apprxWaitTime () {
    let apprxWaitInSeconds = (this.customersInLine * this.averageWaitSeconds)
    return moment.duration(apprxWaitInSeconds, 'seconds').humanize()
  }

  get averageWaitSeconds () {
    return moment.duration(this.stats.AVGWT).seconds()
  }

  get maxWaitSeconds () {
    return moment.duration(this.stats.MaxWT).seconds()
  }

  static getUnits (unitId = 1) {
    let url = `http://q-flow-tt/iwtweb/xml_IWT_Stats.aspx?controller=ACF_IWT_UnitsXML&unitid=${unitId}`
    return fetch(url).then(res => res.text())
    // .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
    .then(str => xml2js(str, {compact: true}))
    .then(json => json.Units.Unit.Services.Service.map(x => new Service(x)))
  }

  // static getStats (unitId = 1) {
  //   let url = `http://q-flow-tt/iwtweb/xml_IWT_Stats.aspx?controller=ACF_IWT_XML&unitid=${unitId}`
  //   return fetch(url).then(res => res.text())
  //   // .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
  //   .then(str => xml2js(str, {compact: true}))
  //   // .then(json => json.Units.Unit.Services.Service.map(x => new Service(x)))
  // }

}
