import { xml2js } from 'xml-js'
import moment from 'moment'

export default class Service {

  constructor (service) {
    this.id = service._attributes.ServiceId
    this.name = service._attributes.ServiceName

    this.stats = {}

    for (var k in service) {
      if (service[k]._text) {
        this.stats[k] = service[k]._text
      }
    }
  }

  get customersInLine () {
    return parseInt(this.stats.WaitingCount)
  }

  get apprxWaitTime () {
    return moment.duration(this.stats.TotalTime).humanize()
  }

  // get apprxWaitTime () {
  //   let apprxWaitInSeconds = (this.customersInLine * this.averageWaitSeconds)
  //   return moment.duration(apprxWaitInSeconds, 'seconds').humanize()
  // }

  get averageWaitSeconds () {
    return moment.duration(this.stats.AvgWT).as('seconds')
  }

  get maxWaitSeconds () {
    return moment.duration(this.stats.MaxWT).as('seconds')
  }

  static getStats (unitId = 1) {
    let url = `/iwtweb/xml_IWT_Stats.aspx?controller=ACF_IWT_ServiceStatsXML&unitid=${unitId}&servicefilterid=2`
    return fetch(url).then(res => res.text())
    // .then(str => (new window.DOMParser()).parseFromString(str, 'text/xml'))
    .then(str => xml2js(str, {compact: true}))
    // .then(json => json.Units.Unit.Services.Service.map(x => new Service(x)))
    .then(json => {
      console.log(json)
      return json.Unit.Service.map(x => new Service(x))
    })
  }

}
