import { Card, CardProps, Space } from 'antd'
import { FC, Fragment, useState } from 'react'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import styles from './index.module.less'

interface ProCardProps extends CardProps {
  showCollapseBtn?: boolean
  defaultCollapsed?: boolean
}
export const ProCard: FC<ProCardProps> = (props) => {
  const {
    children,
    showCollapseBtn = true,
    defaultCollapsed = false,
    ...rest
  } = props
  const [collapsed, setCollapsed] = useState(defaultCollapsed)
  return (
    <Card
      {...rest}
      className={`mb-[10px] ${styles.wrapper} ${collapsed ? styles.hidden : ''} ${rest.className || ''}`}
      extra={
        <Space>
          {rest.extra}
          {showCollapseBtn ? (
            <Fragment>
              {collapsed ? (
                <PlusOutlined
                  className="cursor-pointer select-none"
                  onClick={() => setCollapsed(false)}
                />
              ) : (
                <MinusOutlined
                  className="cursor-pointer select-none"
                  onClick={() => setCollapsed(true)}
                />
              )}
            </Fragment>
          ) : null}
        </Space>
      }
    >
      {children}
    </Card>
  )
}
