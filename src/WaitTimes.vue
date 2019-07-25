<template>
  <div id="app">

    <div class="table-responsive">
      <table class="table table-striped table-bordered table-sm small">
        <thead>
          <tr>
            <th>Service</th>
            <th>Customers in Line</th>
            <th>Total Served</th>
            <th>Average Wait Time</th>
            <th>Max Wait Time</th>
            <th>Apprx. Wait Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="service in services" :key="service.id">
            <td>{{ service.name }}</td>
            <td>{{ service.customersInLine }}</td>

            <td>{{ service.stats.TotalServed }}</td>

            <td>{{ service.stats.AvgWT }}</td>

            <td>{{ service.stats.MaxWT }}</td>

            <td>{{ service.apprxWaitTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- <pre>{{ $data }}</pre> -->

  </div>
</template>

<script>
import Service from './assets/Service'

export default {
  name: 'waittimes',
  data: () => ({
    // loading: false,
    services: null
    // autoRefresh: false,
    // refreshInterval: null,
  }),
  methods: {
    getUnits () {
      this.services = null
      Service.getStats().then(data => {
        // console.log('units', data)
        this.services = data
      })
      .catch(this.handleErr)
    },
    handleErr (err) {
      console.error('Error in fetch', err);
    }
  },
  watch: {
  },
  mounted () {

      this.getUnits()
    // Service.getStats()

  }
}
</script>
