import { FC, useState, useEffect, Fragment } from 'react'
import { Upload, UploadFile, Image } from 'antd'
import ImgCrop from 'antd-img-crop'
import { PlusOutlined } from '@ant-design/icons'
import { useAppStore } from '@/stores/app'
import { Config } from '@/config/Config'
import { concatBaseUri, removeBaseUri } from '@/utils/HelperUtil'

interface UploadImageProps {
  maxCount?: number
  disabled?: boolean
  withBaseUri?: boolean
  value?: UploadFile[] | string
  onChange?: (fileList: UploadFile[]) => void
}

export const UploadImage: FC<UploadImageProps> = (props) => {
  const { maxCount = 1, value, disabled, withBaseUri, onChange } = props
  const { token } = useAppStore((state) => state)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [visible, setVisible] = useState(false)
  const [current, setCurrent] = useState(0)

  const handlePreview = (file: UploadFile) => {
    const index = fileList.findIndex((item) => {
      return item.uid === file.uid
    })
    setVisible(true)
    setCurrent(index || 0)
  }

  const handleChange = (fileList: UploadFile[]) => {
    setFileList(
      fileList.map((item) => {
        if (withBaseUri) {
          item.url = concatBaseUri(item.url || '')
        }
        return item
      }),
    )
    if (onChange) {
      onChange(
        fileList.map((item) => {
          if (withBaseUri) {
            item.url = removeBaseUri(item.url || '')
          }
          return item
        }),
      )
    }
  }

  useEffect(() => {
    let items = []
    if (typeof value === 'string') {
      items = value ? [{ url: value, uid: value, name: value }] : []
    } else {
      items = value || []
    }
    setFileList(
      items.map((item) => {
        if (withBaseUri) {
          item.url = `${Config.BaseUri}${item.url}`
        }
        return item
      }),
    )
  }, [value])

  return (
    <Fragment>
      <ImgCrop rotationSlider fillColor="transparent">
        <Upload
          action={`${Config.BaseUri}/admin/upload/upload`}
          disabled={disabled}
          accept="image/*"
          fileList={fileList}
          multiple
          withCredentials
          headers={{
            Authorization: token,
          }}
          maxCount={maxCount}
          listType="picture-card"
          onChange={({ fileList }) => {
            const isUploading = fileList.some(
              (item) => item.status === 'uploading',
            )
            if (!isUploading) {
              handleChange(
                fileList
                  .map((item) => {
                    item.url = item.url || item.response.data.url
                    return item
                  })
                  .filter((item) => item.url),
              )
            } else {
              setFileList(fileList)
            }
          }}
          onPreview={handlePreview}
        >
          {disabled || fileList.length >= maxCount ? null : <PlusOutlined />}
        </Upload>
      </ImgCrop>
      <Image.PreviewGroup
        preview={{
          visible,
          current: current,
          onChange: (current) => setCurrent(current),
          onVisibleChange: (visible) => setVisible(visible),
        }}
        items={
          fileList && fileList.length
            ? fileList.map(
                (item) => item.url || item.response || item.thumbUrl || '',
              )
            : undefined
        }
      />
    </Fragment>
  )
}
