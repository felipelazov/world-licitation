'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { WelcomeScreen } from '@/components/onboarding/welcome-screen'
import { OnboardingWizard } from '@/components/onboarding/onboarding-wizard'
import { createClient } from '@/lib/supabase/client'

export default function OnboardingPage() {
  const [phase, setPhase] = useState<'welcome' | 'wizard' | 'done'>('welcome')
  const router = useRouter()
  const supabase = createClient()

  async function handleComplete(data: {
    companyName: string
    cnpj: string
    segment: string
    region: string
    capacity: string
    keywords: string[]
  }) {
    // Save profile data
    await supabase
      .from('profiles')
      .update({
        full_name: data.companyName,
        metadata: {
          cnpj: data.cnpj,
          segment: data.segment,
          region: data.region,
          capacity: data.capacity,
          onboarding_completed: true,
          onboarding_completed_at: new Date().toISOString(),
        },
      })
      .eq('id', (await supabase.auth.getUser()).data.user?.id ?? '')

    // Create edital filter with keywords
    if (data.keywords.length > 0) {
      await supabase.from('edital_filters').insert({
        name: 'Filtro inicial',
        keywords: data.keywords,
        is_active: true,
      })
    }

    setPhase('done')
    router.push('/dashboard')
  }

  function handleSkip() {
    router.push('/dashboard')
  }

  return (
    <div className="flex min-h-[60vh] items-center justify-center py-8">
      {phase === 'welcome' && (
        <WelcomeScreen
          onStartOnboarding={() => setPhase('wizard')}
          onSkip={handleSkip}
        />
      )}
      {phase === 'wizard' && (
        <OnboardingWizard onComplete={handleComplete} />
      )}
    </div>
  )
}
