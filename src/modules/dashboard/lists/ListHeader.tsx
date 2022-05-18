import { Trans } from '@lingui/macro';
import { ReactNode } from 'react';
import { BoxProps } from '@mui/material';

import { ListColumn } from '../../../components/lists/ListColumn';
import { ListHeaderTitle } from '../../../components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from '../../../components/lists/ListHeaderWrapper';
import { ListButtonsColumn } from './ListButtonsColumn';

interface ListHeaderProps extends BoxProps {
  head: ReactNode[];
  assetsTitle?: ReactNode | string;
  px?: 4 | 6;
  children?: ReactNode;
}

export const ListHeader = ({ head, assetsTitle, ...rest }: ListHeaderProps) => {
  return (
    <ListHeaderWrapper {...rest}>
      <ListColumn maxWidth={160} isRow>
        <ListHeaderTitle>
          {typeof assetsTitle !== 'undefined' ? assetsTitle : <Trans>Assets</Trans>}
        </ListHeaderTitle>
      </ListColumn>

      {head.map((title, i) => (
        <ListColumn key={i}>
          <ListHeaderTitle>{title}</ListHeaderTitle>
        </ListColumn>
      ))}

      <ListButtonsColumn />
    </ListHeaderWrapper>
  );
};
