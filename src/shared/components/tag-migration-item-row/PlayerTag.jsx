import React from 'react'
import PropTypes from 'prop-types'
import { Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import { FormattedMessage } from 'react-intl'

import PermissionProvider from 'shared/components/permission-provider'
import { TAG_MIGRATION_TYPES, URL_PREFIX } from 'shared/constants'
import ToolTip from 'shared/components/tooltip'

function TagMigrationPlayerItemRow({
  tag,
  index,
  selectedTag,
  onSelect,
  bulkPermission,
  onDelete,
  handleChooseTag,
  docsData,
  onChangeTagDoc,
  onChangeTagType,
  isLoading,
  handleScroll,
  optimizedSearch,
  onMenuClose,
  onTagMerge,
  onClear
}) {
  const defaultValue = { label: <FormattedMessage id="player" />, value: 'player' }
  return (
    <tr key={tag._id}>
      <td>
        <PermissionProvider isAllowedTo={bulkPermission} isArray>
          <Form.Check
            type="checkbox"
            id={selectedTag[index]?._id}
            name={selectedTag[index]?._id}
            checked={selectedTag[index]?.value}
            className="form-check m-0"
            onChange={onSelect}
            label="&nbsp;"
          />
        </PermissionProvider>
      </td>
      <td>{tag.sName ? tag.sName : '-'}</td>
      <td className="migration-dropdown-td">
        <div className="migration-dropdown align-items-center">
          <Select
            options={docsData}
            getOptionLabel={(option) => option.sFirstName}
            getOptionValue={(option) => option._id}
            className="react-select"
            classNamePrefix="select"
            onMenuOpen={() => handleChooseTag(tag._id)}
            onInputChange={(value, action) => optimizedSearch(value, action)}
            onMenuScrollToBottom={handleScroll}
            onChange={(e) => {
              onChangeTagDoc(e, tag._id)
            }}
            isLoading={isLoading}
            onMenuClose={onMenuClose}
          />
          <Button onClick={() => onClear(tag._id)} variant="link" className="square icon-btn ms-1">
            <i className="icon-close d-block" />
          </Button>
        </div>
      </td>
      <td className="migration-dropdown-td">
        <div className="migration-dropdown">
          <Select
            options={TAG_MIGRATION_TYPES}
            defaultValue={defaultValue}
            className="react-select"
            classNamePrefix="select"
            onChange={(e) => {
              onChangeTagType(e, tag.iTermId, tag._id)
            }}
          />
        </div>
      </td>
      <td>
        <ToolTip toolTipMessage={<FormattedMessage id="openInNewTab"/>}>
          <a className="link" href={`${URL_PREFIX}${tag?.sSlug}`} target="_blank" rel="noreferrer">
            <Button variant="link" className="square icon-btn">
              <i className="icon-language d-block" />
            </Button>
          </a>
        </ToolTip>
        <PermissionProvider isAllowedTo="LIST_MIGRATION_TAG">
          <ToolTip toolTipMessage={<FormattedMessage id="merge"/>}>
            <Button variant="link" className="square icon-btn" onClick={() => onTagMerge(tag._id)}>
              <i className="icon-merge d-block" />
            </Button>
          </ToolTip>
        </PermissionProvider>
        <PermissionProvider isAllowedTo="LIST_MIGRATION_TAG">
          <ToolTip toolTipMessage={<FormattedMessage id="delete"/>}>
            <Button variant="link" className="square icon-btn" onClick={() => onDelete(tag._id)}>
              <i className="icon-delete d-block" />
            </Button>
          </ToolTip>
        </PermissionProvider>
      </td>
    </tr>
  )
}
TagMigrationPlayerItemRow.propTypes = {
  tag: PropTypes.object,
  index: PropTypes.number,
  selectedTag: PropTypes.array,
  bulkPermission: PropTypes.array,
  onSelect: PropTypes.func,
  onDelete: PropTypes.func,
  handleChooseTag: PropTypes.func,
  docsData: PropTypes.array,
  onChangeTagDoc: PropTypes.func,
  onChangeTagType: PropTypes.func,
  isLoading: PropTypes.bool,
  handleScroll: PropTypes.func,
  optimizedSearch: PropTypes.func,
  onMenuClose: PropTypes.func,
  onTagMerge: PropTypes.func,
  onClear: PropTypes.func
}
export default TagMigrationPlayerItemRow
