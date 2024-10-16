import React, { useState } from 'react'
import TopBar from './TopBar'
import { Eye, Pencil, Trash2, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { useForm, Head } from '@inertiajs/react'

interface Deal {
    id: string
    company_id: string
    user_id: string
    contact_id: string
    title: string
    value: string
    stage: string
    deadline: string
}

interface Company {
    id: number
    name: string
    industry_id: number
}

interface User {
    id: number
    first_name: string
    last_name: string
    email: string
    address: string
    phone: string
}

interface Contact {
    id: number
    first_name: string
    last_name: string
    email: string
    address: string
    phone: string
    city: string
    position: string
}

interface Props {
  initialDeals: Deal[]
  companies: Company[]
  users: User[]
  contacts: Contact[]
}

export default function Deals({ initialDeals, companies, users, contacts }: Props) {
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const { data, setData, post, processing, reset, errors } = useForm({
    id: '',
    company_id: '',
    user_id: '',
    contact_id: '',
    title: '',
    value: '',
    stage: '',
    deadline: '',
  })

  const { data: editData, setData: setEditData, put, processing: editProcessing, reset: resetEdit, errors: editErrors } = useForm({
    id: '',
    company_id: '',
    user_id: '',
    contact_id: '',
    title: '',
    value: '',
    stage: '',
    deadline: '',
  })

  const { delete: destroy } = useForm();

  const handlePreview = (deal: Deal) => {
    setSelectedDeal(deal)
    setIsPreviewOpen(true)
  }

  const handleEdit = (deal: Deal) => {
    resetEdit()
    setEditData(deal)
    setIsEditOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this deal?')) {
      destroy(route('deals.destroy', id), {
        preserveScroll: true,
        onSuccess: () => {
          setDeals(deals.filter(deal => deal.id !== id))
        }
      });
    }
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    put(route('deals.update', editData.id), {
      onSuccess: () => {
        setIsEditOpen(false)
        resetEdit()

        setDeals(deals.map(deal => deal.id === editData.id ? {...deal, ...editData} : deal))
      },
      preserveScroll: true
    })
  }

  const submit = (e: React.FormEvent)  => {
    e.preventDefault();
    post(route('deals.store'), { 
      onSuccess: () => {
        reset()
        setIsCreateOpen(false)
      },
      preserveScroll: true 
    })
  };

  const getCompanyName = (company_id: number) => {
    const company = companies.find(ind => ind.id === company_id)
    return company ? company.name : 'Unknown'
  }

  const getUserName = (user_id: number) => {
    const user = users.find(ind => ind.id === user_id)
    return user ? user.first_name : 'Unknown'
  }

  const getEmail = (contact_id: number) => {
    const contact = contacts.find(ind => ind.id === contact_id)
    return contact ? contact.email : 'Unknown'
  }

  const currentUser = {
    name: 'John Doe',
    role: 'admin' as const,
  }
  
  return (
    <>
      <Head title="Deals" />
      <div className="p-6 space-y-6">
        <TopBar currentUser={currentUser} />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Deals</CardTitle>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Deal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Deal</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                  <div>
                  <Label htmlFor="company_id">Company Name</Label>
                  <Select
                    value={data.company_id.toString()}
                    onValueChange={(value) => setData('company_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an company..." />
                    </SelectTrigger>
                    <SelectContent>
                      {companies.map((company) => (
                        <SelectItem key={company.id} value={company.id.toString()}>
                          {company.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contact_id">Email</Label>
                  <Select
                    value={data.contact_id.toString()}
                    onValueChange={(value) => setData('contact_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an email..." />
                    </SelectTrigger>
                    <SelectContent>
                      {contacts.map((contact) => (
                        <SelectItem key={contact.id} value={contact.id.toString()}>
                          {contact.email}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={e => setData('title', e.target.value)}
                      required
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                  </div>
                  <div>
                    <Label htmlFor="value">Value</Label>
                    <Input
                      id="value"
                      value={data.value}
                      onChange={e => setData('value', e.target.value)}
                      required
                    />
                    {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value}</p>}
                  </div>
                  <div>
                  <Label htmlFor="stage">Stage</Label>
                  <Select
                    value={data.stage}
                    onValueChange={(value) => setData('stage', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select the current stage..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key={1} value={"lead"}>Lead</SelectItem>
                        <SelectItem key={2} value={"negotiation"}>Negotiation</SelectItem>
                        <SelectItem key={3} value={"win"}>Win</SelectItem>
                        <SelectItem key={4} value={"lost"}>Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                  <div>
                    <Label htmlFor="deadline">Deadline</Label>
                    <Input
                      id="deadline"
                      type="date"
                      value={data.deadline}
                      onChange={e => setData('deadline', e.target.value)}
                      required
                    />
                    {errors.deadline && <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>}
                  </div>
                  <Button type="submit" disabled={processing}>Create Deal</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Stage</TableHead>
                  <TableHead>Deadline</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map(deal => (
                  <TableRow key={deal.id}>
                    <TableCell>{getCompanyName(parseInt(deal.company_id))}</TableCell>
                    <TableCell>{getUserName(parseInt(deal.user_id))}</TableCell>
                    <TableCell>{getEmail(parseInt(deal.contact_id))}</TableCell>
                    <TableCell>{deal.title}</TableCell>
                    <TableCell>{deal.value}</TableCell>
                    <TableCell>{deal.stage}</TableCell>
                    <TableCell>{deal.deadline}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handlePreview(deal)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(deal)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(deal.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Preview Dialog */}
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Deal Details</DialogTitle>
            </DialogHeader>
            {selectedDeal && (
              <div className="space-y-4">
                <div>
                  <Label>Company</Label>
                  <p>{getCompanyName(parseInt(selectedDeal.company_id))}</p>
                </div>
                <div>
                  <Label>User</Label>
                  <p>{getUserName(parseInt(selectedDeal.user_id))}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p>{getEmail(parseInt(selectedDeal.contact_id))}</p>
                </div>
                <div>
                  <Label>title</Label>
                  <p>{selectedDeal.title}</p>
                </div>
                <div>
                  <Label>Value</Label>
                  <p>{selectedDeal.value}</p>
                </div>
                <div>
                  <Label>Stage</Label>
                  <p>{selectedDeal.stage}</p>
                </div>
                <div>
                  <Label>Deadline</Label>
                  <p>{selectedDeal.deadline}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Deal</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
            <div>
                <Label htmlFor="company_id">Company Name</Label>
                <Select
                value={editData.company_id}
                onValueChange={(value) => setEditData('company_id', value)}
                >
                <SelectTrigger>
                    <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                    {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id.toString()}>
                        {company.name}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                {editErrors.company_id && <p className="text-red-500 text-sm mt-1">{editErrors.company_id}</p>}
            </div>
            <div>
                <Label htmlFor="contact_id">Email</Label>
                <Select
                value={editData.contact_id}
                onValueChange={(value) => setEditData('contact_id', value)}
                >
                <SelectTrigger>
                    <SelectValue placeholder="Select a contact" />
                </SelectTrigger>
                <SelectContent>
                    {contacts.map((contact) => (
                    <SelectItem key={contact.id} value={contact.id.toString()}>
                        {contact.email}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
                {editErrors.contact_id && <p className="text-red-500 text-sm mt-1">{editErrors.contact_id}</p>}
            </div>
              <div>
                <Label htmlFor="edit_title">Title</Label>
                <Input
                  id="edit_title"
                  value={editData.title}
                  onChange={(e) => setEditData('title', e.target.value)}
                  required
                />
                {editErrors.title && <p className="text-red-500 text-sm mt-1">{editErrors.title}</p>}
              </div>
              <div>
                <Label htmlFor="edit_value">Value</Label>
                <Input
                  id="edit_value"
                  type="value"
                  value={editData.value}
                  onChange={(e) => setEditData('value', e.target.value)}
                  required
                />
                {editErrors.value && <p className="text-red-500 text-sm mt-1">{editErrors.value}</p>}
              </div>
              <div>
                  <Label htmlFor="edit_stage">Stage</Label>
                  <Select
                    value={editData.stage}
                    onValueChange={(value) => setData('stage', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem key={1} value={"lead"}>Lead</SelectItem>
                        <SelectItem key={2} value={"negotiation"}>Negotiation</SelectItem>
                        <SelectItem key={3} value={"win"}>Win</SelectItem>
                        <SelectItem key={4} value={"lost"}>Lost</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              <div>
                <Label htmlFor="edit_deadline">Deadline</Label>
                <Input
                  id="edit_deadline"
                  type="date"
                  value={editData.deadline}
                  onChange={(e) => setEditData('deadline', e.target.value)}
                  required
                />
                {editErrors.deadline && <p className="text-red-500 text-sm mt-1">{editErrors.deadline}</p>}
              </div>
              <Button type="submit" disabled={editProcessing}>Update Deal</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}