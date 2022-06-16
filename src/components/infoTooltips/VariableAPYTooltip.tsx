import { Trans } from '@lingui/macro';

import { TextWithTooltip, TextWithTooltipProps } from '../TextWithTooltip';

export const VariableAPYTooltip = ({ ...rest }: TextWithTooltipProps) => {
  return (
    <TextWithTooltip {...rest}>
      <Trans>
        Interest rate will <b>fluctuate</b> based on the market conditions. Recommended for
        short-term loans.
      </Trans>
    </TextWithTooltip>
  );
};
