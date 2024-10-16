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

interface Company {
  id: number
  name: string
  industry_id: number
}

interface Props {
  companies: Company[],
  industries: Industry[]
}

export default function Companies({ companies, industries }: Props) {
  const { data, setData, post, processing, reset, errors } = useForm({
    industry_id: '',
    name: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const submit = (e: any)  => {
    e.preventDefault();
    post(route('companies.store'), { onSuccess: () => reset(), preserveScroll: true })
  };

  const { delete: destroy } = useForm();

  const handleDelete = (id: number)  => {
    destroy(route('companies.destroy', id), { 
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
          <CardTitle className="text-2xl font-bold">Companies</CardTitle>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Company
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Company</DialogTitle>
              </DialogHeader>
              <form onSubmit={submit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Company Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="industry_id">Industry</Label>
                  <Select
                    value={data.industry_id.toString()}
                    onValueChange={(value) => setData('industry_id', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select an industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry) => (
                        <SelectItem key={industry.id} value={industry.id.toString()}>
                          {industry.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit">Create Company</Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.map(company => (
                <TableRow key={company.id}>
                  <TableCell>{company.name}</TableCell>
                  <TableCell>{getIndustryName(company.industry_id)}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(company.id)}>
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