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

interface Company {
    id: number
    name: string
    industry_id: number
}

interface Contact {
    id: string
    company_id: string
    first_name: string
    last_name: string
    email: string
    address: string
    phone: string
    city: string
    position: string
}

interface Props {
  companies: Company[]
  initialContacts: Contact[]
}

export default function Contacts({ companies, initialContacts }: Props) {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const { data, setData, post, processing, reset, errors } = useForm({
    id: '',
    company_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    position: '',
  })

  const { data: editData, setData: setEditData, put, processing: editProcessing, reset: resetEdit, errors: editErrors } = useForm({
    id: '',
    company_id: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    position: '',
  })

  const { delete: destroy } = useForm();

  const handlePreview = (contact: Contact) => {
    setSelectedContact(contact)
    setIsPreviewOpen(true)
  }

  const handleEdit = (contact: Contact) => {
    resetEdit()
    setEditData(contact)
    setIsEditOpen(true)
  }

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this contact?')) {
      destroy(route('contacts.destroy', id), {
        preserveScroll: true,
        onSuccess: () => {
          setContacts(contacts.filter(contact => contact.id !== id))
        }
      });
    }
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    put(route('contacts.update', editData.id), {
      onSuccess: () => {
        setIsEditOpen(false)
        resetEdit()

        setContacts(contacts.map(contact => contact.id === editData.id ? {...contact, ...editData} : contact))
      },
      preserveScroll: true
    })
  }

  const submit = (e: React.FormEvent)  => {
    e.preventDefault();
    post(route('contacts.store'), { 
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

  const currentUser = {
    name: 'John Doe',
    role: 'admin' as const,
  }

  return (
    <>
      <Head title="Contacts" />
      <div className="p-6 space-y-6">
        <TopBar currentUser={currentUser} />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Contacts</CardTitle>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Contact
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Contact</DialogTitle>
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
                <Label htmlFor="first_name">First name</Label>
                <Input
                    id="first_name"
                    value={data.first_name}
                    onChange={e => setData('first_name', e.target.value)}
                    required
                />
                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                </div>
                <div>
                <Label htmlFor="last_name">Last name</Label>
                <Input
                    id="last_name"
                    value={data.last_name}
                    onChange={e => setData('last_name', e.target.value)}
                    required
                />
                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                </div>
                <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    required
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        value={data.phone}
                        onChange={e => setData('phone', e.target.value)}
                        required
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                <div>
                <Label htmlFor="address">Address</Label>
                <Input
                    id="address"
                    value={data.address}
                    onChange={e => setData('address', e.target.value)}
                    required
                />
                {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                </div>
                <div>
                <Label htmlFor="city">City</Label>
                <Input
                    id="city"
                    value={data.city}
                    onChange={e => setData('city', e.target.value)}
                    required
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
                <div>
                <Label htmlFor="position">Position</Label>
                <Input
                    id="position"
                    value={data.position}
                    onChange={e => setData('position', e.target.value)}
                    required
                />
                {errors.position && <p className="text-red-500 text-sm mt-1">{errors.position}</p>}
                </div>
                  <Button type="submit" disabled={processing}>Create Contact</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map(contact => (
                  <TableRow key={contact.id}>
                    <TableCell>{getCompanyName(parseInt(contact.company_id))}</TableCell>
                    <TableCell>{`${contact.first_name} ${contact.last_name}`}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.phone}</TableCell>
                    <TableCell>{contact.address}</TableCell>
                    <TableCell>{contact.city}</TableCell>
                    <TableCell>{contact.position}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handlePreview(contact)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(contact)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(contact.id)}>
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
              <DialogTitle>Contact Details</DialogTitle>
            </DialogHeader>
            {selectedContact && (
              <div className="space-y-4">
                <div>
                  <Label>Company</Label>
                  <p>{getCompanyName(parseInt(selectedContact.company_id))}</p>
                </div>
                <div>
                  <Label>Name</Label>
                  <p>{`${selectedContact.first_name} ${selectedContact.last_name}`}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p>{selectedContact.email}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p>{selectedContact.phone}</p>
                </div>
                <div>
                  <Label>Address</Label>
                  <p>{selectedContact.address}</p>
                </div>
                <div>
                  <Label>City</Label>
                  <p>{selectedContact.city}</p>
                </div>
                <div>
                  <Label>Position</Label>
                  <p>{selectedContact.position}</p>
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
                <Label htmlFor="edit_first_name">First Name</Label>
                <Input
                  id="edit_first_name"
                  value={editData.first_name}
                  onChange={(e) => setEditData('first_name', e.target.value)}
                  required
                />
                {editErrors.first_name && <p className="text-red-500 text-sm mt-1">{editErrors.first_name}</p>}
              </div>
              <div>
                <Label htmlFor="edit_last_name">Last Name</Label>
                <Input
                  id="edit_last_name"
                  value={editData.last_name}
                  onChange={(e) => setEditData('last_name', e.target.value)}
                  required
                />
                {editErrors.last_name && <p className="text-red-500 text-sm mt-1">{editErrors.last_name}</p>}
              </div>
              <div>
                <Label htmlFor="edit_email">Email</Label>
                <Input
                  id="edit_email"
                  type="email"
                  value={editData.email}
                  onChange={(e) => setEditData('email', e.target.value)}
                  required
                />
                {editErrors.email && <p className="text-red-500 text-sm mt-1">{editErrors.email}</p>}
              </div>
              <div>
                <Label htmlFor="edit_address">Address</Label>
                <Input
                  id="edit_address"
                  value={editData.address}
                  onChange={(e) => setEditData('address', e.target.value)}
                  required
                />
                {editErrors.address && <p className="text-red-500 text-sm mt-1">{editErrors.address}</p>}
              </div>
              <div>
                <Label htmlFor="edit_city">City</Label>
                <Input
                  id="edit_city"
                  value={editData.city}
                  onChange={(e) => setEditData('city', e.target.value)}
                  required
                />
                {editErrors.city && <p className="text-red-500 text-sm mt-1">{editErrors.city}</p>}
              </div>
              <div>
                <Label htmlFor="edit_position">Position</Label>
                <Input
                  id="edit_position"
                  value={editData.position}
                  onChange={(e) => setEditData('position', e.target.value)}
                  required
                />
                {editErrors.position && <p className="text-red-500 text-sm mt-1">{editErrors.position}</p>}
              </div>
              <Button type="submit" disabled={editProcessing}>Update Deal</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}