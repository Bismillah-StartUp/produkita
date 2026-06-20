'use client'

import { useEffect } from 'react'
import { useLicenceContext } from '@/app/licenses/[code]/layout'

interface SetCertificationsVisibilityProps {
  enabled: boolean
}

export default function SetCertificationsVisibility({ enabled }: SetCertificationsVisibilityProps) {
  const { setShowCertifications } = useLicenceContext()

  useEffect(() => {
    setShowCertifications(enabled)
  }, [enabled, setShowCertifications])

  return null
}