'use client'

import { useEffect } from 'react'
import { useLicenceContext } from '@/app/licenses/[code]/layout'

interface SetEnterpriseNameProps {
  name?: string | null
}

export default function SetEnterpriseName({ name }: SetEnterpriseNameProps) {
  const { setEnterpriseName } = useLicenceContext()

  useEffect(() => {
    setEnterpriseName(name?.trim() || 'Company Name')
  }, [name, setEnterpriseName])

  return null
}