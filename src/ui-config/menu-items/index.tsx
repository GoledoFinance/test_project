import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { t } from '@lingui/macro';
import { ReactNode } from 'react';
import { ROUTES } from 'src/components/primitives/Link';

// import DiscordIcon from '/public/icons/discord.svg';
import TelegramIcon from '/public/icons/telegram.svg';
import GithubIcon from '/public/icons/github.svg';

import { MarketDataType } from '../marketsConfig';

interface Navigation {
  link: string;
  title: string;
  isVisible?: (data: MarketDataType) => boolean | undefined;
  dataCy?: string;
}

export const navigation: Navigation[] = [
  {
    link: ROUTES.dashboard,
    title: t`Dashboard`,
    dataCy: 'menuDashboard',
  },
  {
    link: ROUTES.markets,
    title: t`Markets`,
  },
  {
    link: ROUTES.staking,
    title: t`Stake`,
    isVisible: () => process.env.NEXT_PUBLIC_ENABLE_STAKING === 'true',
  },
];

interface MoreMenuItem extends Navigation {
  icon: ReactNode;
}

const moreMenuItems: MoreMenuItem[] = [
  {
    link: 'https://goledo-cash.gitbook.io/goledo/',
    title: t`FAQ`,
    icon: <QuestionMarkCircleIcon />,
  },
  /*{
    link: 'https://docs.aave.com/portal/',
    title: t`Developers`,
    icon: <BookOpenIcon />,
  },*/
  {
    link: '#',
    title: t`Telegram`,
    icon: <TelegramIcon />,
  },
  {
    link: 'https://github.com/Goledo',
    title: t`Github`,
    icon: <GithubIcon />,
  },
];

export const moreMenuExtraItems: MoreMenuItem[] = [];
export const moreMenuMobileOnlyItems: MoreMenuItem[] = [];

export const moreNavigation: MoreMenuItem[] = [...moreMenuItems, ...moreMenuExtraItems];

export const mobileNavigation: Navigation[] = [
  ...navigation,
  ...moreMenuItems,
  ...moreMenuMobileOnlyItems,
];
