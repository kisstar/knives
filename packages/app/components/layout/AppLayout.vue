<template>
  <v-layout>
    <v-system-bar v-if="showSystemBar">
      <router-view :name="ROUTER_VIEW.SYSTEM_BAR"></router-view>
    </v-system-bar>
    <v-app-bar v-if="showHeaderBar" height="60" flat>
      <router-view :name="ROUTER_VIEW.HEADER_BAR"></router-view>
    </v-app-bar>
    <v-navigation-drawer v-if="showAsideNav" width="80" permanent>
      <router-view :name="ROUTER_VIEW.ASIDE_NAV"></router-view>
    </v-navigation-drawer>
    <v-navigation-drawer v-if="showLeftContent" width="200" permanent>
      <router-view :name="ROUTER_VIEW.LEFT_CONTENT"></router-view>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-if="showRightContent"
      location="right"
      width="272"
      permanent
    >
      <router-view :name="ROUTER_VIEW.RIGHT_CONTENT"></router-view>
    </v-navigation-drawer>
    <v-app-bar v-if="showFooterBar" height="48" location="bottom" flat>
      <router-view :name="ROUTER_VIEW.FOOTER_BAR"></router-view>
    </v-app-bar>
    <v-main v-if="showContent">
      <router-view :name="ROUTER_VIEW.CONTENT"></router-view>
    </v-main>
  </v-layout>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { isUndefined } from 'lodash-es';
import { ROUTER_VIEW } from '@app/constants';

const showRouterView = (name: ROUTER_VIEW) => {
  const { meta } = useRoute();
  const { layout = {} } = meta;
  const routerView = layout[name];
  const isShow = routerView || isUndefined(routerView);

  return isShow;
};
const showSystemBar = computed(() => showRouterView(ROUTER_VIEW.SYSTEM_BAR));
const showHeaderBar = computed(() => showRouterView(ROUTER_VIEW.HEADER_BAR));
const showAsideNav = computed(() => showRouterView(ROUTER_VIEW.ASIDE_NAV));
const showLeftContent = computed(() =>
  showRouterView(ROUTER_VIEW.LEFT_CONTENT),
);
const showContent = computed(() => showRouterView(ROUTER_VIEW.CONTENT));
const showRightContent = computed(() =>
  showRouterView(ROUTER_VIEW.RIGHT_CONTENT),
);
const showFooterBar = computed(() => showRouterView(ROUTER_VIEW.FOOTER_BAR));
</script>
