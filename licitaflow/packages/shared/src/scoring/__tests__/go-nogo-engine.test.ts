import { describe, it, expect } from 'vitest'
import { calculateScore, type ScoringInput } from '../go-nogo-engine'

function makeElim(answers: (boolean | null)[]): ScoringInput['eliminatory'] {
  return answers.map((answer, i) => ({ id: `elim_${i}`, answer }))
}

function makeScoring(scores: (number | null)[]): ScoringInput['scoring'] {
  return scores.map((score, i) => ({ id: `score_${i}`, score }))
}

describe('calculateScore', () => {
  it('returns NO-GO when any eliminatory criterion fails', () => {
    const result = calculateScore({
      eliminatory: makeElim([true, false, true, true, true]),
      scoring: makeScoring([5, 5, 5, 5, 5]),
    })
    expect(result.decision).toBe('no_go')
    expect(result.failedEliminatory).toContain('elim_1')
    expect(result.score).toBeNull()
  })

  it('returns NO-GO with multiple failed eliminatory', () => {
    const result = calculateScore({
      eliminatory: makeElim([false, true, false, true, true]),
      scoring: makeScoring([4, 4, 4, 4, 4]),
    })
    expect(result.decision).toBe('no_go')
    expect(result.failedEliminatory).toHaveLength(2)
    expect(result.justificativa).toContain('2 critérios eliminatórios')
  })

  it('returns GO when all eliminatory pass and score >= 3', () => {
    const result = calculateScore({
      eliminatory: makeElim([true, true, true, true, true]),
      scoring: makeScoring([4, 3, 5, 3, 4]),
    })
    expect(result.decision).toBe('go')
    expect(result.score).toBe(3.8)
    expect(result.scoreFormatted).toBe('3.8/5.0')
  })

  it('returns GO with ressalvas when all pass but score < 3', () => {
    const result = calculateScore({
      eliminatory: makeElim([true, true, true, true, true]),
      scoring: makeScoring([2, 1, 3, 2, 2]),
    })
    expect(result.decision).toBe('go_ressalvas')
    expect(result.score).toBe(2)
    expect(result.scoreFormatted).toBe('2.0/5.0')
    expect(result.justificativa).toContain('ressalvas')
  })

  it('returns PENDENTE when eliminatory has unanswered', () => {
    const result = calculateScore({
      eliminatory: makeElim([true, null, true, true, true]),
      scoring: makeScoring([4, 4, 4, 4, 4]),
    })
    expect(result.decision).toBe('pendente')
    expect(result.hasUnansweredEliminatory).toBe(true)
    expect(result.justificativa).toContain('pendente')
  })

  it('returns PENDENTE when all eliminatory pass but no scoring filled', () => {
    const result = calculateScore({
      eliminatory: makeElim([true, true, true, true, true]),
      scoring: makeScoring([null, null, null, null, null]),
    })
    expect(result.decision).toBe('pendente')
    expect(result.hasUnansweredScoring).toBe(true)
    expect(result.score).toBeNull()
  })

  it('calculates partial score when some scoring is filled', () => {
    const result = calculateScore({
      eliminatory: makeElim([true, true, true, true, true]),
      scoring: makeScoring([5, 4, null, null, null]),
    })
    expect(result.decision).toBe('go')
    expect(result.score).toBe(4.5)
    expect(result.hasUnansweredScoring).toBe(true)
    expect(result.justificativa).toContain('3 critérios de scoring pendentes')
  })

  it('returns NO-GO even with unanswered eliminatory if one fails', () => {
    const result = calculateScore({
      eliminatory: makeElim([true, false, null, true, true]),
      scoring: makeScoring([5, 5, 5, 5, 5]),
    })
    expect(result.decision).toBe('no_go')
    expect(result.failedEliminatory).toContain('elim_1')
  })

  it('formats score correctly', () => {
    const result = calculateScore({
      eliminatory: makeElim([true, true, true, true, true]),
      scoring: makeScoring([5, 5, 5, 5, 5]),
    })
    expect(result.scoreFormatted).toBe('5.0/5.0')
    expect(result.score).toBe(5)
  })

  it('handles perfect GO scenario', () => {
    const result = calculateScore({
      eliminatory: makeElim([true, true, true, true, true]),
      scoring: makeScoring([5, 5, 5, 5, 5]),
    })
    expect(result.decision).toBe('go')
    expect(result.hasUnansweredEliminatory).toBe(false)
    expect(result.hasUnansweredScoring).toBe(false)
    expect(result.failedEliminatory).toHaveLength(0)
  })

  it('handles empty input', () => {
    const result = calculateScore({
      eliminatory: [],
      scoring: [],
    })
    expect(result.decision).toBe('pendente')
    expect(result.score).toBeNull()
  })

  it('handles single eliminatory fail with singular text', () => {
    const result = calculateScore({
      eliminatory: makeElim([false]),
      scoring: makeScoring([5]),
    })
    expect(result.decision).toBe('no_go')
    expect(result.justificativa).toContain('1 critério eliminatório não atendido')
  })
})
