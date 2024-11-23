type ToolbarMenuItemValue = 'add-host-item' | 'add-host-group';

export interface ToolbarMenuItem {
  title: string;
  value: ToolbarMenuItemValue;
}

export const TOOLBAR_MENU: ToolbarMenuItem[] = [
  { title: '添加分组', value: 'add-host-item' },
  { title: '添加配置项', value: 'add-host-group' },
];
