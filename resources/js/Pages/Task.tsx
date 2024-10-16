import React, { useState, useEffect } from 'react'
import TopBar from './TopBar'
import { format } from 'date-fns'
import { Trash2, Plus } from 'lucide-react'
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
import { useForm } from '@inertiajs/react';

interface Task {
  id: number
  title: string
  description: string
  start: string
  end: string
}

interface Props {
  tasks: Task[]
}

export default function Tasks({ tasks }: Props) {
  // const [searchTerm, setSearchTerm] = useState('')
  const { data, setData, post, processing, reset, errors } = useForm({
    title: '',
    description: '',
    start: '',
    end: '',
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const submit = (e: any)  => {
    e.preventDefault();
    post(route('tasks.store'), { onSuccess: () => reset(), preserveScroll: true })
  };

  const { delete: destroy } = useForm();

  const handleDelete = (id: number)  => {
    destroy(route('tasks.destroy', id), { 
      preserveScroll: true,
    });
  };

  const currentUser = {
    name: 'John Doe',
    role: 'admin' as const,
  }

  return (
    <div className="p-6 space-y-6">
      <TopBar currentUser={currentUser} />
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            {/* <Input
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            /> */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> New Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                </DialogHeader>
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={data.title}
                      onChange={e => setData('title', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={data.description}
                      onChange={e => setData('description', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="start">Start Date</Label>
                    <Input
                      id="start"
                      type="date"
                      value={data.start}
                      onChange={e => setData('start', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="end">End Date</Label>
                    <Input
                      id="end"
                      type="date"
                      value={data.end}
                      onChange={e => setData('end', e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit">Create Task</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tasks.map(task => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{format(new Date(task.start), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>{format(new Date(task.end), 'dd/MM/yyyy')}</TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => handleDelete(task.id)}>
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
  );
} 