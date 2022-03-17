import React, { useEffect, useState } from 'react';
import { route } from "next/dist/server/router";
import { Table, Tag, Space, Button } from 'antd';
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
        let order: string = String(router.query.order ? router.query.order : 'descend')
        const order_by: string = String(router.query.order_by ? router.query.order_by : 'id')
        const response = await fetchMember({
          page: parseInt(router.query.page as string) || 1, 
          per_page: 1, 
          order: order,
          order_by: order_by,
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

  const changeTable = (paginate: any, filters: any, sorter: any) => {
    // console.log(paginate)
    console.log(sorter)
    // console.log(filters)
    let link = `${router.pathname}?page=${paginate.current}`
    if (sorter.column) {
      link = `${link}&order_by=${sorter.field}&order=${sorter.order}`
    }
    console.log(link)
    router.push(link)
  }

  const handleDestroy = (id: number) => {
    console.log(listMembers)
    alert(`destroy: ${id}`)
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: true
    },
    {
      title: 'Full Name',
      dataIndex: 'full_name',
      key: 'full_name',
      render: (text) => <p>{text}</p>,
    },
    {
      title: 'Date of birth',
      dataIndex: 'date_of_birth',
      key: 'date_of_birth',
      sorter: true
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
            <a onClick={e => handleDestroy(record.id)}>Delete</a>
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
        onChange={changeTable}
        pagination={{
          total: paging.total ? paging.total : null,
          current: paging.current ? paging.current : 1,
          pageSize: 1,
          // onChange:(page, pageSize) => {
          //   router.push(`${router.pathname}?page=${page}`)
          // }
        }} 
      />
    </>
  )
}

export default TableUsers;