"use client"
import { useState } from 'react'
import {
  useGetCreditDataQuery,
  useCreateCreateDataMutation,
  useUpdateCreateDataMutation,
  useDeleteCreateDataMutation,
} from '@/redux/api/creditsApi'
import { Pencil, Trash2, Coins, Plus, X, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Spin } from 'antd'
import { toast } from 'sonner'


interface CreditPlan {
  _id: string
  title: string
  description: string
  credits: number
  amount: number
  currency: string
  bonusCredits: number
  status: string
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

interface FormState {
  title: string
  description: string
  credits: string
  amount: string
  currency: string
  bonusCredits: string
}

const defaultForm: FormState = {
  title: '',
  description: '',
  credits: '',
  amount: '',
  currency: 'usd',
  bonusCredits: '0',
}

export default function AllExtraCredits() {
  const { data, isLoading, isError } = useGetCreditDataQuery(undefined)
  const [createCredit, { isLoading: isCreating }] = useCreateCreateDataMutation()
  const [updateCredit, { isLoading: isUpdating }] = useUpdateCreateDataMutation()
  const [deleteCredit] = useDeleteCreateDataMutation()

  const plans: CreditPlan[] = data?.data ?? []

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingPlan, setEditingPlan] = useState<CreditPlan | null>(null)
  const [form, setForm] = useState<FormState>(defaultForm)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // ── Handlers ────────────────────────────────────────────
  const openCreate = () => {
    setEditingPlan(null)
    setForm(defaultForm)
    setDialogOpen(true)
  }

  const openEdit = (plan: CreditPlan) => {
    setEditingPlan(plan)
    setForm({
      title: plan.title,
      description: plan.description,
      credits: String(plan.credits),
      amount: String(plan.amount),
      currency: plan.currency,
      bonusCredits: String(plan.bonusCredits),
    })
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
    setEditingPlan(null)
    setForm(defaultForm)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async () => {
    const payload = {
      title: form.title,
      description: form.description,
      credits: Number(form.credits),
      amount: Number(form.amount),
      currency: form.currency,
      bonusCredits: Number(form.bonusCredits),
    }

    try {
      if (editingPlan) {
        await updateCredit({ id: editingPlan._id, ...payload }).unwrap()
      } else {
        await createCredit(payload).unwrap()
      }
      handleClose()
    } catch (err: any) {
      toast.error(err?.data?.message)
    }
  }

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      await deleteCredit(id).unwrap()
    } catch (err: any) {
      toast.error(err?.data?.message)
    } finally {
      setDeletingId(null)
    }
  }

  // ── Render ───────────────────────────────────────────────
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Spin size='large' />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-destructive text-sm">Failed to load credit plans.</p>
      </div>
    )
  }

  const isSaving = isCreating || isUpdating

  return (
    <div className="p-6">
      {/* ── Page Header ── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Extra Credit Plans</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your available credit packages</p>
        </div>

        <Button style={{ background: "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)" }} onClick={openCreate} className="gap-2">
          <Plus className="w-4 h-4" />
          Add More
        </Button>
      </div>

      {/* ── Cards Grid ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {plans.map((plan) => (
          <Card
            key={plan._id}
            className="relative border bg-card hover:shadow-md transition-shadow duration-200"
          >
            {/* Edit / Delete */}
            <div className="absolute top-3 right-3 flex gap-1.5 z-10">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                onClick={() => openEdit(plan)}
                title="Edit"
              >
                <Pencil className="h-3.5 w-3.5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                onClick={() => handleDelete(plan._id)}
                disabled={deletingId === plan._id}
                title="Delete"
              >
                {deletingId === plan._id
                  ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  : <Trash2 className="h-3.5 w-3.5" />
                }
              </Button>
            </div>

            <CardContent className="pt-4 pb-4 px-4">
              <Badge
                style={{ background: "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)" }}
                variant={plan.status === 'active' ? 'default' : 'secondary'}
                className="mb-3 text-[10px] uppercase tracking-widest"
              >
                {plan.status}
              </Badge>

              <div className="flex items-end gap-3 mb-3">
                <div className="w-11 h-11 rounded-xl bg-[#4E9DA6]/20 flex items-center justify-center shrink-0">
                  <Coins className="w-5 h-5 text-[#4E9DA6]" />
                </div>
                <div>
                  <p className="text-3xl font-extrabold leading-none tracking-tight">{plan.credits}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mt-0.5">Credits</p>
                </div>
              </div>

              <p className="font-semibold text-sm pr-14 leading-tight">{plan.title}</p>
              <p className="text-xs text-muted-foreground mt-1 mb-3 leading-relaxed">{plan.description}</p>

              <hr className="mb-3 border-border" />

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-muted/40 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Base</p>
                  <p className="text-sm font-bold">{plan.credits}</p>
                </div>
                <div className="bg-muted/40 rounded-lg px-3 py-2">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider mb-0.5">Bonus</p>
                  <p className="text-sm font-bold text-[#4E9DA6]">
                    {plan.bonusCredits > 0 ? `+${plan.bonusCredits}` : '—'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-border">
                <p className="text-xl font-extrabold tracking-tight">${plan.amount.toFixed(2)}</p>
                <span className="text-[10px] font-medium text-muted-foreground bg-muted border border-border rounded px-2 py-0.5 uppercase tracking-wider">
                  {plan.currency}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Dialog Form ── */}
      <Dialog open={dialogOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-lg font-bold tracking-tight">
              {editingPlan ? 'Edit Credit Plan' : 'Add Credit Plan'}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            {/* Title */}
            <div className="grid gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                placeholder="Enter title..."
                value={form.title}
                onChange={handleChange}
                className='py-5 bg-gray-50'
              />
            </div>

            {/* Description */}
            <div className="grid gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                placeholder="Short description of this plan"
                value={form.description}
                onChange={handleChange}
                rows={3}
                className=' bg-gray-50'
              />
            </div>

            {/* Credits + Bonus Credits */}
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="credits">Credits</Label>
                <Input
                  id="credits"
                  name="credits"
                  type="number"
                  min={0}
                  placeholder="Enter credits..."
                  value={form.credits}
                  onChange={handleChange}
                  className='py-5 bg-gray-50'
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="bonusCredits">Bonus Credits</Label>
                <Input
                  id="bonusCredits"
                  name="bonusCredits"
                  type="number"
                  min={0}
                  placeholder="Enter bonus credits"
                  value={form.bonusCredits}
                  onChange={handleChange}
                  className='py-5 bg-gray-50'
                />
              </div>
            </div>

            {/* Amount + Currency */}

            <div className="grid gap-1.5">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                min={0}
                step={0.01}
                placeholder="Enter amount..."
                value={form.amount}
                onChange={handleChange}
                className='py-5 bg-gray-50'
              />
            </div>

          </div>


          <DialogFooter className="gap-2 pt-2">
            <Button variant="outline" onClick={handleClose} disabled={isSaving}>
              <X className="w-4 h-4 mr-1.5" />
              Cancel
            </Button>
            <Button style={{ background: "linear-gradient(180deg, #4E9DA6 0.89%, #1A2935 100.89%)" }} onClick={handleSubmit} disabled={isSaving}>
              {isSaving
                ? <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                : !editingPlan && <Plus className="w-4 h-4 mr-1.5" />
              }
              {editingPlan ? 'Save Changes' : 'Create Plan'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}