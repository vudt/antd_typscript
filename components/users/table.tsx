import React, { useEffect, useState } from 'react';
import { route } from "next/dist/server/router";
import { Table, Tag, Space } from 'antd';
import { DataMember } from '../../interfaces/member';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { fetchMember } from '../../api/member';
import { prepareListMembers } from '../../services/member';


const TableUsers: React.FC = () => {
  const router = useRouter();
  const [listMembers, setListMembers] = useState<DataMember[]>([])
  const [paging, setPaging] = useState<{total: number, current: number}>({total: null, current: null})

  useEffect(() => {
    (async () => {
      try {
        let sort: string = String(router.query.sort ? router.query.sort : 'desc')
        const response = await fetchMember({
          page: parseInt(router.query.page as string) || 1, 
          per_page: 1, 
          sort: sort,
          status: parseInt(router.query.status as string) || '' 
        })
        if (response.status == true) {
          setPaging({total: response.data.total_pages, current: response.data.current_page})
          console.log(response.data)
          const members: DataMember[] = prepareListMembers(response.data.members)
          setListMembers(members)
        }
      } catch (error) {
        console.log(error)
      }
    })()
  }, [router.query])

  const columns = [
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Date of birth',
      dataIndex: 'dob',
      key: 'dob',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        const color: string = status == 1 ? 'green' : 'volcano';
        const text: string = status == 1 ? 'Publish' : 'Un publish';
        return <Tag color={color} key={status}>{text}</Tag>
      }
    },
    {
      title: 'Action',
      key: 'action',
      render: (record) => {
        return (
          <Space size="middle">
            <Link href={`/dashboard/users/edit/${record.id}`}>Edit</Link>
            <a>Delete</a>
          </Space>
        )
      },
    },
  ];

  return(
    <>
      <Table 
        columns={columns} 
        dataSource={listMembers} 
        pagination={{
          total: paging.total ? paging.total : null,
          current: paging.current ? paging.current : 1,
          pageSize: 1,
          onChange:(page, pageSize) => {
            router.push(`${router.pathname}?page=${page}`)
          }
        }} 
      />
    </>
  )
}

export default TableUsers;