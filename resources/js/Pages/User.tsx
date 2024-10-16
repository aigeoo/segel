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
import { Label } from "@/components/ui/label"
import { useForm, Head } from '@inertiajs/react'

interface User {
  id: number
  first_name: string
  last_name: string
  email: string
  address: string
  phone: string
}

interface Props {
  initialUsers: User[]
}

export default function Users({ initialUsers }: Props) {
  const [users, setUsers] = useState<User[]>(initialUsers)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const { data, setData, post, processing, reset, errors } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone: '',
  })

  const { data: editData, setData: setEditData, put, processing: editProcessing, reset: resetEdit, errors: editErrors } = useForm({
    first_name: '',
    last_name: '',
    email: '',
    address: '',
    phone: '',
  })

  const { delete: destroy } = useForm();

  const handlePreview = (user: User) => {
    setSelectedUser(user)
    setIsPreviewOpen(true)
  }

  const handleEdit = (user: User) => {
    resetEdit()
    setEditData(user)
    setIsEditOpen(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this user?')) {
      destroy(route('users.destroy', id), {
        preserveScroll: true,
        onSuccess: () => {
          setUsers(users.filter(user => user.id !== id))
        }
      });
    }
  }

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    put(route('users.update'), {
      onSuccess: () => {
        setIsEditOpen(false)
        resetEdit()
      },
      preserveScroll: true
    })
  }

  const submit = (e: React.FormEvent)  => {
    e.preventDefault();
    post(route('users.store'), { 
      onSuccess: () => {
        reset()
        setIsCreateOpen(false)
      },
      preserveScroll: true 
    })
  };

  const currentUser = {
    name: 'John Doe',
    role: 'admin' as const,
  }

  return (
    <>
      <Head title="Users" />
      <div className="p-6 space-y-6">
        <TopBar currentUser={currentUser} />
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-2xl font-bold">Users</CardTitle>
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New User</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={data.first_name}
                      onChange={e => setData('first_name', e.target.value)}
                      required
                    />
                    {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
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
                      type="email"
                      value={data.email}
                      onChange={e => setData('email', e.target.value)}
                      required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
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
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      value={data.phone}
                      onChange={e => setData('phone', e.target.value)}
                      required
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <Button type="submit" disabled={processing}>Create User</Button>
                </form>
              </DialogContent>
            </Dialog>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{`${user.first_name} ${user.last_name}`}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" onClick={() => handlePreview(user)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleEdit(user)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(user.id)}>
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
              <DialogTitle>User Details</DialogTitle>
            </DialogHeader>
            {selectedUser && (
              <div className="space-y-4">
                <div>
                  <Label>ID</Label>
                  <p>{selectedUser.id}</p>
                </div>
                <div>
                  <Label>First Name</Label>
                  <p>{selectedUser.first_name}</p>
                </div>
                <div>
                  <Label>Last Name</Label>
                  <p>{selectedUser.last_name}</p>
                </div>
                <div>
                  <Label>Email</Label>
                  <p>{selectedUser.email}</p>
                </div>
                <div>
                  <Label>Address</Label>
                  <p>{selectedUser.address}</p>
                </div>
                <div>
                  <Label>Phone</Label>
                  <p>{selectedUser.phone}</p>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleUpdate} className="space-y-4">
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
                <Label htmlFor="edit_phone">Phone</Label>
                <Input
                  id="edit_phone"
                  value={editData.phone}
                  onChange={(e) => setEditData('phone', e.target.value)}
                  required
                />
                {editErrors.phone && <p className="text-red-500 text-sm mt-1">{editErrors.phone}</p>}
              </div>
              <Button type="submit" disabled={editProcessing}>Update User</Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  )
}