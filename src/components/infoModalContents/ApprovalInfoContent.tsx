import { Trans } from '@lingui/macro';
import Typography from '@mui/material/Typography';

import { Link } from '../primitives/Link';
import { InfoContentWrapper } from './InfoContentWrapper';

export const ApprovalInfoContent = () => {
  return (
    <InfoContentWrapper caption={<Trans>Approval</Trans>}>
      <Typography>
        <Trans>
          Before supplying, you need to approve its usage by the Goledo Cash. You can learn more in
          our
          <Link fontWeight={500} href={'https://goledo-cash.gitbook.io/goledo/'}>
            FAQ
          </Link>
        </Trans>
      </Typography>
    </InfoContentWrapper>
  );
};
