import { checkA11y } from '@storybook/addon-a11y';
import { withInfo } from '@storybook/addon-info';
import { setOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';
import React from 'react';
import { withThemesProvider } from 'storybook-addon-styled-component-theme';
import styled from '../src/styled-components';
import { dark, light } from '../src/Theme';

setOptions({
  name: 'MyCrypto UI',
  url: 'https://github.com/MyCryptoHQ/ui',
});

addDecorator(checkA11y);

addDecorator((story, context) =>
  withInfo({ header: false, inline: true })(story)(context),
);

const Container = styled.div`
  background: ${props => props.theme.background};
  border-radius: 4px;
  bottom: 0;
  color: ${props => props.theme.text};
  left: 0;
  padding: 8px;
  position: absolute;
  right: 0;
  top: 0;
`;
addDecorator(story => <Container>{story()}</Container>);

addDecorator(withThemesProvider([light, dark]));

const req = require.context('../src', true, /.story.[jt]sx?$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
