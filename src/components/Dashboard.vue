<template>
  <div class="cube-dashboard">
    <smart-widget-grid :layout="layout">
      <smart-widget slot="totalUsers" simple>
        <!-- Total Users Statistic -->
        <query-builder :cubejs-api="cubejsApi" :query="usersQuery">
          <template v-slot="{ loading, resultSet }">
            <chart-adapter v-if="!loading" title="Total Users" type="stat" :result-set="resultSet"/>
          </template>
        </query-builder>
      </smart-widget>
      <smart-widget slot="totalOrders" simple>
        <!-- Total Orders Statistic -->
        <query-builder :cubejs-api="cubejsApi" :query="totalOrdersQuery">
          <template v-slot="{ loading, resultSet }">
            <chart-adapter
              v-if="!loading"
              title="Total Orders"
              type="stat"
              :result-set="resultSet"
            />
          </template>
        </query-builder>
      </smart-widget>
      <smart-widget slot="shippedOrders" simple>
        <!-- Shipped Orders Statistic -->
        <query-builder :cubejs-api="cubejsApi" :query="shippedOrdersQuery">
          <template v-slot="{ loading, resultSet }">
            <chart-adapter
              v-if="!loading"
              title="Shipped Orders"
              type="stat"
              :result-set="resultSet"
            />
          </template>
        </query-builder>
      </smart-widget>
      <smart-widget slot="newUsers" title="New Users Over Time">
        <template v-slot="{contentH}">
          <!-- New Users Over Time Query -->
          <query-builder :cubejs-api="cubejsApi" :query="lineQuery">
            <template v-slot="{ loading, dimensions, measures, resultSet }">
              <chart-adapter
                v-if="!loading"
                type="line"
                :result-set="resultSet"
                :height="contentH"
              />
            </template>
          </query-builder>
        </template>
      </smart-widget>
      <smart-widget slot="ordersByStatus" title="Orders by Status Over time" fullscreen>
        <template v-slot="{contentH}">
          <!-- Orders by Status Over time Query -->
          <query-builder :cubejs-api="cubejsApi" :query="barQuery">
            <template v-slot="{ loading, dimensions, measures, resultSet }">
              <chart-adapter v-if="!loading" type="bar" :result-set="resultSet" :height="contentH"/>
            </template>
          </query-builder>
        </template>
      </smart-widget>
    </smart-widget-grid>
  </div>
</template>

<script>
import cubejs from "@cubejs-client/core";
import { QueryBuilder } from "@cubejs-client/vue";
import ChartAdapter from "./ChartAdapter.vue";

const cubejsApi = cubejs(
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.K9PiJkjegbhnw4Ca5pPlkTmZihoOm42w8bja9Qs2qJg",
  { apiUrl: "https://react-query-builder.herokuapp.com/cubejs-api/v1" }
);

export default {
  name: "Dashboard",
  components: {
    QueryBuilder,
    ChartAdapter
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 4, h: 3, i: "totalUsers" },
        { x: 4, y: 0, w: 4, h: 3, i: "totalOrders" },
        { x: 8, y: 0, w: 4, h: 3, i: "shippedOrders" },
        { x: 0, y: 4, w: 6, h: 9, i: "newUsers" },
        { x: 6, y: 4, w: 6, h: 9, i: "ordersByStatus" }
      ],
      cubejsApi,
      usersQuery: { measures: ["Users.count"] },
      totalOrdersQuery: { measures: ["Orders.count"] },
      shippedOrdersQuery: {
        measures: ["Orders.count"],
        filters: [
          {
            dimension: "Orders.status",
            operator: "equals",
            values: ["shipped"]
          }
        ]
      },
      lineQuery: {
        measures: ["Users.count"],
        timeDimensions: [
          {
            dimension: "Users.createdAt",
            dateRange: ["2017-01-01", "2018-12-31"],
            granularity: "month"
          }
        ]
      },
      barQuery: {
        measures: ["Orders.count"],
        dimensions: ["Orders.status"],
        timeDimensions: [
          {
            dimension: "Orders.createdAt",
            dateRange: ["2017-01-01", "2018-12-31"],
            granularity: "month"
          }
        ]
      }
    };
  }
};
</script>

<style>
.widget-body-simple {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
