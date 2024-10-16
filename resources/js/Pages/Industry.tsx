import React, { useState } from 'react'
import TopBar from './TopBar'
import { Plus, Trash2 } from 'lucide-react'
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
import { useForm } from '@inertiajs/react';

interface Industry {
  id: number
  name: string
}

interface Props {
  industries: Industry[]
}

export default function Industries({ industries }: Props) {
  const { data, setData, post, processing, reset, errors } = useForm({
    name: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const submit = (e: any)  => {
    e.preventDefault();
    post(route('industries.store'), { onSuccess: () => reset(), preserveScroll: true })
  };

  const { delete: destroy } = useForm();

  const handleDelete = (id: number)  => {
    destroy(route('industries.destroy', id), { 
      preserveScroll: true,
    });
  };

  const getIndustryName = (industryId: number) => {
    const industry = industries.find(ind => ind.id === industryId)
    return industry ? industry.name : 'Unknown'
  }

  const currentUser = {
    name: 'John Doe',
    role: 'admin' as const,
  }

  return (
    <div className="p-6 space-y-6">
      <TopBar currentUser={currentUser} />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Industries</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Industry
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Industry</DialogTitle>
              </DialogHeader>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Industry Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    required
                  />
                </div>
                <Button type="submit">Create Industry</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
              <TableHead>Id</TableHead>
                <TableHead>Industry Name</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {industries.map(industry => (
                <TableRow key={industry.id}>
                  <TableCell>{industry.id}</TableCell>
                  <TableCell>{industry.name}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(industry.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}