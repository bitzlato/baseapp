/* eslint-disable no-template-curly-in-string */
import { FC } from 'react';
import { Button } from 'web/src/components/ui/Button';
import { Table, TableHeader, TableBody, TableRow } from 'web/src/components/Gifts/Table';
import { TableHeaderColumn, TableColumn } from 'web/src/components/Gifts/TableColumn';
import { Box } from 'web/src/components/ui/Box';
import { Card, CardBody, CardHeader } from 'web/src/components/ui/Card';
import { Container } from 'web/src/components/ui/Container';
import { Text } from 'web/src/components/ui/Text';
import { SelectCustom } from 'web/src/components/SelectCustom/SelectCustom';
import { CryptoCurrencyIcon } from 'web/src/components/ui/CryptoCurrencyIcon';
import { CryptoCurrencyOption } from 'web/src/components/shared/Ads/CryptoCurrencyOption';
import { TextAreaInput, TextInput } from 'web/src/components/TextInputCustom/TextInputCustom';
import { TextInputWithControl } from 'web/src/components/TextInputCustom/TextInputWithControl';

export const ComponentsScreen: FC = () => {
  const headerButton = (
    <TableHeader>
      <TableHeaderColumn size="medium">
        <Box pl="6x">
          <Text variant="caption" fontWeight="strong">
            Props
          </Text>
        </Box>
      </TableHeaderColumn>
      <TableHeaderColumn size="medium">
        <Text as="span" variant="caption" color="textMuted">
          color=
        </Text>
        <Text as="span" variant="caption" fontWeight="strong">
          primary
        </Text>
      </TableHeaderColumn>
      <TableHeaderColumn size="medium">
        <Text as="span" variant="caption" color="textMuted">
          color=
        </Text>
        <Text as="span" variant="caption" fontWeight="strong">
          secondary
        </Text>
      </TableHeaderColumn>
      <TableHeaderColumn size="medium">
        <Text as="span" variant="caption" color="textMuted">
          color=
        </Text>
        <Text as="span" variant="caption" fontWeight="strong">
          danger
        </Text>
      </TableHeaderColumn>
      <TableHeaderColumn size="medium">
        <Text as="span" variant="caption" color="textMuted">
          color=
        </Text>
        <Text as="span" variant="caption" fontWeight="strong">
          clarified
        </Text>
      </TableHeaderColumn>
    </TableHeader>
  );

  const headerText = (
    <TableHeader>
      <TableHeaderColumn size="small">
        <Box pl="6x">
          <Text variant="caption" fontWeight="strong">
            Props
          </Text>
        </Box>
      </TableHeaderColumn>
      <TableHeaderColumn size="medium">
        <Text as="span" variant="caption" fontWeight="strong">
          View
        </Text>
      </TableHeaderColumn>
      <TableHeaderColumn size="medium">
        <Text as="span" variant="caption" color="textMuted">
          gutterBottom=
        </Text>
        <Text as="span" variant="caption" fontWeight="strong">
          true
        </Text>
      </TableHeaderColumn>
    </TableHeader>
  );

  const headerSelect = (
    <TableHeader>
      <TableHeaderColumn size="medium">
        <Box pl="6x">
          <Text variant="caption" fontWeight="strong">
            Props
          </Text>
        </Box>
      </TableHeaderColumn>
      <TableHeaderColumn size="medium">
        <Text as="span" variant="caption" fontWeight="strong">
          View
        </Text>
      </TableHeaderColumn>
    </TableHeader>
  );

  return (
    <Container maxWidth="fullhd">
      <Card mb="8x">
        <CardHeader>{'<Button />'}</CardHeader>
        <CardBody>
          <Table header={headerButton} isLoading={false}>
            <TableBody>
              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      contained
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="primary">
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="secondary">
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="danger">
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="contained" color="clarified">
                      Contained
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      outlined
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="outlined" color="primary">
                    Outlined
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="outlined" color="secondary">
                    Outlined
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="outlined" color="danger">
                    Outlined
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="outlined" color="clarified">
                      Outlined
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      text
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="text" color="primary">
                    Text
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="text" color="secondary">
                    Text
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="text" color="danger">
                    Text
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="text" color="clarified">
                      Text
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      size=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      small
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="primary" size="small">
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="secondary" size="small">
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="danger" size="small">
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="contained" color="clarified" size="small">
                      Contained
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      size=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      medium
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="primary" size="medium">
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="secondary" size="medium">
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="danger" size="medium">
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="contained" color="clarified" size="medium">
                      Contained
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      size=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      large
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="primary" size="large">
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="secondary" size="large">
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="danger" size="large">
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="contained" color="clarified" size="large">
                      Contained
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      size=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      icon
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="primary" size="icon">
                    🥷
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="secondary" size="icon">
                    🥷
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="danger" size="icon">
                    🥷
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="contained" color="clarified" size="icon">
                      🥷
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      contained
                    </Text>
                  </Box>
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      active=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      true
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="primary" active>
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="secondary" active>
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="danger" active>
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="contained" color="clarified" active>
                      Contained
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      outlined
                    </Text>
                  </Box>
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      active=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      true
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="outlined" color="primary" active>
                    Outlined
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="outlined" color="secondary" active>
                    Outlined
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="outlined" color="danger" active>
                    Outlined
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="outlined" color="clarified" active>
                      Outlined
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      text
                    </Text>
                  </Box>
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      active=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      true
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="text" color="primary" active>
                    Text
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="text" color="secondary" active>
                    Text
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="text" color="danger" active>
                    Text
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="text" color="clarified" active>
                      Text
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      contained
                    </Text>
                  </Box>
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      disabled=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      true
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="primary" disabled>
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="secondary" disabled>
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="danger" disabled>
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="contained" color="clarified" active>
                      Contained
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      outlined
                    </Text>
                  </Box>
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      disabled=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      true
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="outlined" color="primary" disabled>
                    Outlined
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="outlined" color="secondary" disabled>
                    Outlined
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="outlined" color="danger" disabled>
                    Outlined
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="outlined" color="clarified" disabled>
                      Outlined
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      text
                    </Text>
                  </Box>
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      disabled=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      true
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="text" color="primary" disabled>
                    Text
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="text" color="secondary" disabled>
                    Text
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="text" color="danger" disabled>
                    Text
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="text" color="clarified" disabled>
                      Text
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="medium">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      fullWidth=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      true
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="primary" fullWidth>
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="secondary" fullWidth>
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Button variant="contained" color="danger" fullWidth>
                    Contained
                  </Button>
                </TableColumn>
                <TableColumn size="medium">
                  <Box pr="4x">
                    <Button variant="contained" color="clarified" fullWidth>
                      Contained
                    </Button>
                  </Box>
                </TableColumn>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Card mb="8x">
        <CardHeader>{'<Text />'}</CardHeader>
        <CardBody>
          <Table header={headerText} isLoading={false}>
            <TableBody>
              <TableRow>
                <TableColumn size="small">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      h1
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="h1">Heading 1</Text>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="h1" gutterBottom>
                    Heading 1 with gutterBottom
                  </Text>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="small">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      h2
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="h2">Heading 2</Text>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="h2" gutterBottom>
                    Heading 2 with gutterBottom
                  </Text>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="small">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      h3
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="h3">Heading 3</Text>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="h3" gutterBottom>
                    Heading 3 with gutterBottom
                  </Text>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="small">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      h4
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="h4">Heading 4</Text>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="h4" gutterBottom>
                    Heading 4 with gutterBottom
                  </Text>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="small">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      h5
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="h5">Heading 5</Text>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="h5" gutterBottom>
                    Heading 5 with gutterBottom
                  </Text>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="small">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      h6
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="h6">Heading 6</Text>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="h6" gutterBottom>
                    Heading 6 with gutterBottom
                  </Text>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="small">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      lead
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="lead">Lead</Text>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="lead" gutterBottom>
                    Lead with gutterBottom
                  </Text>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="small">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      title
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="title">Title</Text>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="title" gutterBottom>
                    Title with gutterBottom
                  </Text>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="small">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      label
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="label">Label</Text>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="label" gutterBottom>
                    Label with gutterBottom
                  </Text>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="small">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      body
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="body">Body</Text>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="body" gutterBottom>
                    Body with gutterBottom
                  </Text>
                </TableColumn>
              </TableRow>

              <TableRow>
                <TableColumn size="small">
                  <Box pl="6x">
                    <Text as="span" variant="caption" color="textMuted">
                      variant=
                    </Text>
                    <Text as="span" variant="caption" fontWeight="strong">
                      caption
                    </Text>
                  </Box>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="caption">Caption</Text>
                </TableColumn>
                <TableColumn size="medium">
                  <Text variant="caption" gutterBottom>
                    Caption with gutterBottom
                  </Text>
                </TableColumn>
              </TableRow>
            </TableBody>
          </Table>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>{'<SelectCustom />'}</CardHeader>

        <Table header={headerSelect} isLoading={false}>
          <TableBody>
            <TableRow overflow="visible">
              <TableColumn size="medium">
                <pre>
                  {`
      <SelectCustom
        options={[
          { label: 'Label', value: 'Value' },
          { label: 'Label1', value: 'Value1' },
          { label: 'Label2', value: 'Value2' },
          { label: 'Label3', value: 'Value3' },
        ]}
        value={null}
        placeholder="Choose option"
      />
                `}
                </pre>
              </TableColumn>
              <TableColumn size="medium">
                <Box pr="6x">
                  <SelectCustom
                    options={[
                      { label: 'Label', value: 'Value' },
                      { label: 'Label1', value: 'Value1' },
                      { label: 'Label2', value: 'Value2' },
                      { label: 'Label3', value: 'Value3' },
                    ]}
                    value={null}
                    placeholder="Choose option"
                  />
                </Box>
              </TableColumn>
            </TableRow>
            <TableRow overflow="visible">
              <TableColumn size="medium">
                <pre>
                  {`
      <SelectCustom
        options={[
          { label: 'Label', value: 'Value' },
          { label: 'Label1', value: 'Value1' },
          { label: 'Label2', value: 'Value2' },
          { label: 'Label3', value: 'Value3' },
        ]}
        isError
        placeholder="Choose option"
        value={null}
      />
                `}
                </pre>
              </TableColumn>
              <TableColumn size="medium">
                <Box pr="6x">
                  <SelectCustom
                    options={[
                      { label: 'Label', value: 'Value' },
                      { label: 'Label1', value: 'Value1' },
                      { label: 'Label2', value: 'Value2' },
                      { label: 'Label3', value: 'Value3' },
                    ]}
                    isError
                    placeholder="Choose option"
                    value={null}
                  />
                </Box>
              </TableColumn>
            </TableRow>
            <TableRow overflow="visible">
              <TableColumn size="medium">
                <pre>
                  {`
    <SelectCustom
      placeholder="Select cryptocurrency"
      options={[
        {
          code: 'BTC',
          name: 'Bitcoin',
        },
        {
          code: 'ETH',
          name: 'Ethereum',
        },
        {
          code: 'DOGE',
          name: 'Dogecoin',
        },
      ]}
      withSearch
      searchFunction={(searchText, _optionValue, option) => {
        return (
          option.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
          option.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
        );
      }}
      searchPlaceholder="Search"
      noOptionsMessage="Nothing found"
      getOptionValue={(option) => option.code}
      getOptionLabel={(option) => ${'`${option.code} (${option.name.trim()})`'}}
      renderLabel={(option) => {
        return (
          <Box display="flex" alignItems="center" gap="3x">
            <CryptoCurrencyIcon size="6x" currency={option.code} />
            <Text variant="label">{option.code}</Text>
          </Box>
        );
      }}
      renderOption={CryptoCurrencyOption}
      value={null}
      isError={false}
      onChange={() => {}}
    />
                `}
                </pre>
              </TableColumn>
              <TableColumn size="medium">
                <Box pr="6x">
                  <SelectCustom
                    placeholder="Select cryptocurrency"
                    options={[
                      {
                        code: 'BTC',
                        name: 'Bitcoin',
                      },
                      {
                        code: 'ETH',
                        name: 'Ethereum',
                      },
                      {
                        code: 'DOGE',
                        name: 'Dogecoin',
                      },
                    ]}
                    withSearch
                    searchFunction={(searchText, _optionValue, option) => {
                      return (
                        option.code.toLowerCase().indexOf(searchText.toLowerCase()) > -1 ||
                        option.name.toLowerCase().indexOf(searchText.toLowerCase()) > -1
                      );
                    }}
                    searchPlaceholder="Search"
                    noOptionsMessage="Nothing found"
                    getOptionValue={(option) => option.code}
                    getOptionLabel={(option) => `${option.code} (${option.name.trim()})`}
                    renderLabel={(option) => {
                      return (
                        <Box display="flex" alignItems="center" gap="3x">
                          <CryptoCurrencyIcon size="6x" currency={option.code} />
                          <Text variant="label">{option.code}</Text>
                        </Box>
                      );
                    }}
                    renderOption={CryptoCurrencyOption}
                    value={null}
                    isError={false}
                    onChange={() => {}}
                  />
                </Box>
              </TableColumn>
            </TableRow>
          </TableBody>
        </Table>
      </Card>

      <Card>
        <CardHeader>{'<TextInputCustom />'}</CardHeader>

        <Table header={headerSelect} isLoading={false}>
          <TableBody>
            <TableRow overflow="visible">
              <TableColumn size="medium">
                <pre>
                  {`
    <TextInput
      placeholder="Placeholder"
      onChange={() => {}}
    />
                  `}
                </pre>
              </TableColumn>
              <TableColumn size="medium">
                <Box pr="6x">
                  <TextInput placeholder="Placeholder" onChange={() => {}} />
                </Box>
              </TableColumn>
            </TableRow>
            <TableRow overflow="visible">
              <TableColumn size="medium">
                <pre>
                  {`
    <TextInput
      isError
      placeholder="Placeholder"
      onChange={() => {}}
    />
                  `}
                </pre>
              </TableColumn>
              <TableColumn size="medium">
                <Box pr="6x">
                  <TextInput isError placeholder="Placeholder" onChange={() => {}} />
                </Box>
              </TableColumn>
            </TableRow>
            <TableRow overflow="visible">
              <TableColumn size="medium">
                <pre>
                  {`
    <TextInputWithControl
      placeholder="Placeholder"
      control="USD"
      onChange={() => {}}
    />
                  `}
                </pre>
              </TableColumn>
              <TableColumn size="medium">
                <Box pr="6x">
                  <TextInputWithControl
                    placeholder="Placeholder"
                    control="USD"
                    onChange={() => {}}
                  />
                </Box>
              </TableColumn>
            </TableRow>
            <TableRow overflow="visible">
              <TableColumn size="medium">
                <pre>
                  {`
    <TextAreaInput
      placeholder="Placeholder"
      onChange={() => {}}
    />
                  `}
                </pre>
              </TableColumn>
              <TableColumn size="medium">
                <Box pr="6x">
                  <TextAreaInput placeholder="Placeholder" onChange={() => {}} />
                </Box>
              </TableColumn>
            </TableRow>
          </TableBody>
        </Table>
      </Card>
    </Container>
  );
};
