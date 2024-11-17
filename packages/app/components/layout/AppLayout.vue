<template>
  <v-app>
    <v-layout>
      <!-- 系统栏 -->
      <v-system-bar v-if="showSystemBar">
        <router-view :name="ROUTER_VIEW.SYSTEM_BAR"></router-view>
      </v-system-bar>

      <!-- 顶部导航 -->
      <v-app-bar v-if="showHeaderBar" height="60" flat>
        <router-view :name="ROUTER_VIEW.HEADER_BAR"></router-view>
      </v-app-bar>

      <!-- 左侧导航 -->
      <v-navigation-drawer v-if="showAsideNav" width="80">
        <router-view :name="ROUTER_VIEW.ASIDE_NAV"></router-view>
      </v-navigation-drawer>

      <!-- 左侧边栏 -->
      <v-navigation-drawer v-if="showLeftContent" width="200">
        <router-view :name="ROUTER_VIEW.LEFT_CONTENT"></router-view>
      </v-navigation-drawer>

      <!-- 右侧边栏 -->
      <v-navigation-drawer v-if="showRightContent" location="right" width="272">
        <router-view :name="ROUTER_VIEW.RIGHT_CONTENT"></router-view>
      </v-navigation-drawer>

      <!-- 内容区 -->
      <v-main v-if="showContent">
        <router-view :name="ROUTER_VIEW.CONTENT"></router-view>
      </v-main>

      <!-- 页脚 -->
      <v-app-bar v-if="showFooterBar" height="48" location="bottom" flat>
        <router-view :name="ROUTER_VIEW.FOOTER_BAR"></router-view>
      </v-app-bar>
    </v-layout>
  </v-app>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { isUndefined } from 'lodash-es';
import { ROUTER_VIEW } from '@app/constants';

const { meta } = useRoute();

const showRouterView = (name: ROUTER_VIEW) => {
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
