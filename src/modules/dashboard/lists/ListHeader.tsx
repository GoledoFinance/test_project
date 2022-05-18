import { Trans } from '@lingui/macro';
import { ReactNode } from 'react';

import { ListColumn } from '../../../components/lists/ListColumn';
import { ListHeaderTitle } from '../../../components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from '../../../components/lists/ListHeaderWrapper';
import { ListButtonsColumn } from './ListButtonsColumn';

interface ListHeaderProps {
  head: ReactNode[];
  assetsTitle?: ReactNode | string;
}

export const ListHeader = ({ head, assetsTitle }: ListHeaderProps) => {
  return (
    <ListHeaderWrapper>
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
