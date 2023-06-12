interface NavAttributes {
  [propName: string]: any;
}

interface NavWrapper {
  attribute: NavAttributes;
  element: string;
}

interface NavBadge {
  text: string;
  variant: string;
}

interface NavLabel {
  class?: string;
  variant: string;
}

export interface NavData {
  name?: string;
  url?: string;
  icon?: string;
  badge?: NavBadge;
  title?: boolean;
  showHide?: boolean;
  children?: any;
  variant?: string;
  attributes?: NavAttributes;
  divider?: boolean;
  class?: string;
  label?: string;
  wrapper?: NavWrapper;
}

export const navItems: NavData[] = [
  {
    showHide: false,
    name: 'Dashboard',
    url: '/dashboard',
    class: '',
    icon: 'icon-speedometer',
  },
  {
    showHide: false,
    name: 'DataTables',
    url: '/users',
    icon: 'fa fa-list',
    class: '',
    children: [
      {
        icon: 'fa fa-list-alt',
        name: 'UI Side',
        url: '/users',
        class: '',
      },
      {
        icon: 'fa fa-list-alt',
        name: 'Server & UI Side',
        url: '/users/api-ui-pagination',
        class: '',
      },
    ],
  },
  {
    showHide: false,
    name: 'Socket Event',
    url: '/nest-js-socket',
    class: '',
    icon: 'icon-speedometer',
  },
  {
    showHide: false,
    name: 'Social Login',
    url: '/social-login',
    icon: 'fa fa-users',
    class: '',
    children: [
      {
        icon: 'fab fa-google',
        name: 'Google Login',
        url: '/social-login/google-login',
        class: '',
      },
      {
        icon: 'fab fa-facebook-f',
        name: 'Facebook Login',
        url: '/social-login/fb-login',
        class: '',
      },
    ],
  },
  {
    showHide: false,
    name: 'upload & Progress',
    url: '/fileUploadProgress',
    icon: 'fa fa-store',
    class: '',
  },
];
