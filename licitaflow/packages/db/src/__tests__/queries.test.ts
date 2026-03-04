import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  getEditals,
  getEditalById,
  createEdital,
  upsertEdital,
  updateEditalStatus,
  getEditalSources,
  getEditalSourceBySlug,
  getEditalFilters,
  createEditalFilter,
} from '../queries/editals'
import type { CreateEditalInput } from '../queries/editals'

// ─── Mock Supabase client ──────────────────────────────────

function createMockQuery(returnData: unknown = [], returnCount: number | null = null) {
  const chain: Record<string, ReturnType<typeof vi.fn>> = {}

  const resolve = () => ({
    data: returnData,
    error: null,
    count: returnCount,
  })

  const resolveSingle = () => ({
    data: returnData,
    error: null,
  })

  chain.select = vi.fn().mockReturnValue(chain)
  chain.insert = vi.fn().mockReturnValue(chain)
  chain.update = vi.fn().mockReturnValue(chain)
  chain.upsert = vi.fn().mockReturnValue(chain)
  chain.eq = vi.fn().mockReturnValue(chain)
  chain.in = vi.fn().mockReturnValue(chain)
  chain.or = vi.fn().mockReturnValue(chain)
  chain.order = vi.fn().mockReturnValue(chain)
  chain.range = vi.fn().mockImplementation(() => resolve())
  chain.single = vi.fn().mockImplementation(() => resolveSingle())

  return chain
}

function createMockClient(queryChain: Record<string, ReturnType<typeof vi.fn>>) {
  return {
    from: vi.fn().mockReturnValue(queryChain),
  } as unknown as Parameters<typeof getEditals>[0]
}

// ─── Tests ─────────────────────────────────────────────────

describe('Edital Queries', () => {
  describe('getEditals', () => {
    it('calls from("editals") with select and pagination', async () => {
      const chain = createMockQuery([{ id: '1', title: 'Edital 1' }], 1)
      const client = createMockClient(chain)

      const result = await getEditals(client)

      expect(client.from).toHaveBeenCalledWith('editals')
      expect(chain.select).toHaveBeenCalledWith('*, edital_sources(name, slug)', { count: 'exact' })
      expect(chain.order).toHaveBeenCalledWith('created_at', { ascending: false })
      expect(chain.range).toHaveBeenCalledWith(0, 49)
      expect(result.data).toHaveLength(1)
      expect(result.count).toBe(1)
    })

    it('filters by status string', async () => {
      const chain = createMockQuery()
      const client = createMockClient(chain)

      await getEditals(client, { status: 'novo' })

      expect(chain.eq).toHaveBeenCalledWith('status', 'novo')
    })

    it('filters by status array', async () => {
      const chain = createMockQuery()
      const client = createMockClient(chain)

      await getEditals(client, { status: ['novo', 'go'] })

      expect(chain.in).toHaveBeenCalledWith('status', ['novo', 'go'])
    })

    it('applies search filter', async () => {
      const chain = createMockQuery()
      const client = createMockClient(chain)

      await getEditals(client, { search: 'cesta basica' })

      expect(chain.or).toHaveBeenCalledWith(
        'title.ilike.%cesta basica%,object.ilike.%cesta basica%'
      )
    })

    it('applies custom pagination', async () => {
      const chain = createMockQuery()
      const client = createMockClient(chain)

      await getEditals(client, { limit: 10, offset: 20 })

      expect(chain.range).toHaveBeenCalledWith(20, 29)
    })
  })

  describe('getEditalById', () => {
    it('fetches single edital with source join', async () => {
      const chain = createMockQuery({ id: '1', title: 'Test' })
      const client = createMockClient(chain)

      const result = await getEditalById(client, 'edital-id-1')

      expect(client.from).toHaveBeenCalledWith('editals')
      expect(chain.select).toHaveBeenCalledWith('*, edital_sources(name, slug, base_url)')
      expect(chain.eq).toHaveBeenCalledWith('id', 'edital-id-1')
      expect(chain.single).toHaveBeenCalled()
      expect(result).toEqual({ id: '1', title: 'Test' })
    })
  })

  describe('createEdital', () => {
    it('inserts edital with status novo', async () => {
      const chain = createMockQuery({ id: '1', status: 'novo' })
      const client = createMockClient(chain)

      const input: CreateEditalInput = {
        tenant_id: 'tenant-1',
        source_id: 'source-1',
        external_id: 'EXT-001',
        title: 'Pregao 001/2026',
        object: 'Cesta basica',
        agency: 'Prefeitura X',
        modalidade: 'pregao_eletronico',
        publication_date: '2026-03-01',
        portal_url: 'https://comprasnet.gov.br/123',
      }

      await createEdital(client, input)

      expect(chain.insert).toHaveBeenCalledWith({
        ...input,
        status: 'novo',
      })
      expect(chain.single).toHaveBeenCalled()
    })
  })

  describe('upsertEdital', () => {
    it('upserts with onConflict on source_id,external_id', async () => {
      const chain = createMockQuery({ id: '1' })
      const client = createMockClient(chain)

      const input: CreateEditalInput = {
        tenant_id: 'tenant-1',
        source_id: 'source-1',
        external_id: 'EXT-001',
        title: 'Pregao 001/2026',
        object: 'Cesta basica',
        agency: 'Prefeitura X',
        modalidade: 'pregao_eletronico',
        publication_date: '2026-03-01',
        portal_url: 'https://comprasnet.gov.br/123',
      }

      await upsertEdital(client, input)

      expect(chain.upsert).toHaveBeenCalledWith(
        { ...input, status: 'novo' },
        { onConflict: 'source_id,external_id' }
      )
    })
  })

  describe('updateEditalStatus', () => {
    it('updates status by edital id', async () => {
      const chain = createMockQuery({ id: '1', status: 'go' })
      const client = createMockClient(chain)

      await updateEditalStatus(client, 'edital-1', 'go')

      expect(chain.update).toHaveBeenCalledWith({ status: 'go' })
      expect(chain.eq).toHaveBeenCalledWith('id', 'edital-1')
    })
  })

  describe('getEditalSources', () => {
    it('fetches active sources ordered by name', async () => {
      const mockSources = [
        { id: '1', name: 'BEC-SP', slug: 'bec-sp' },
        { id: '2', name: 'Compras.gov.br', slug: 'compras-gov-br' },
      ]
      const chain = createMockQuery()
      // Override order to return data
      chain.order = vi.fn().mockReturnValue({ data: mockSources, error: null })
      const client = createMockClient(chain)

      const result = await getEditalSources(client)

      expect(client.from).toHaveBeenCalledWith('edital_sources')
      expect(chain.eq).toHaveBeenCalledWith('active', true)
      expect(chain.order).toHaveBeenCalledWith('name')
      expect(result).toEqual(mockSources)
    })
  })

  describe('getEditalSourceBySlug', () => {
    it('fetches single source by slug', async () => {
      const chain = createMockQuery({ id: '1', slug: 'bec-sp' })
      const client = createMockClient(chain)

      const result = await getEditalSourceBySlug(client, 'bec-sp')

      expect(chain.eq).toHaveBeenCalledWith('slug', 'bec-sp')
      expect(chain.single).toHaveBeenCalled()
      expect(result.slug).toBe('bec-sp')
    })
  })

  describe('getEditalFilters', () => {
    it('fetches active filters', async () => {
      const chain = createMockQuery([{ id: '1' }])
      // eq needs to return chain for chaining (active → tenant_id → resolve)
      chain.eq = vi.fn().mockReturnValue(chain)
      // Final call resolves via the last eq returning data
      // Override: make the second eq call return { data, error }
      let callCount = 0
      chain.eq = vi.fn().mockImplementation(() => {
        callCount++
        if (callCount >= 2) {
          return { data: [{ id: '1' }], error: null }
        }
        return chain
      })
      const client = createMockClient(chain)

      const result = await getEditalFilters(client, 'tenant-1')

      expect(client.from).toHaveBeenCalledWith('edital_filters')
      expect(result).toEqual([{ id: '1' }])
    })
  })

  describe('createEditalFilter', () => {
    it('inserts filter with keywords', async () => {
      const chain = createMockQuery({ id: '1', name: 'Cesta Basica' })
      const client = createMockClient(chain)

      await createEditalFilter(client, {
        tenant_id: 'tenant-1',
        name: 'Cesta Basica',
        keywords: ['cesta basica', 'generos alimenticios'],
      })

      expect(chain.insert).toHaveBeenCalledWith({
        tenant_id: 'tenant-1',
        name: 'Cesta Basica',
        keywords: ['cesta basica', 'generos alimenticios'],
        config: {},
        active: true,
      })
    })
  })
})
