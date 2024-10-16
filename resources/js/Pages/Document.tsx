import React, { useState } from 'react';
import TopBar from './TopBar'
import { Trash2, Download, Upload, File } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useForm } from '@inertiajs/react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Document {
  id: number;
  related_type: 'contact' | 'company' | 'deal';
  name: string;
  size: number;
}

interface Props {
  documents: Document[];
}

export default function Documents({ documents }: Props) {
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const { data, setData, post, processing, reset, errors } = useForm({
    related_type: 'contact',
    name: '',
    file: null as File | null,
  });

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('related_type', data.related_type);
    if (data.file) {
      formData.append('file', data.file);
    }

    post(route('documents.store'), {
      data: formData,
      onSuccess: () => {
        reset(); 
        setIsUploadDialogOpen(false); 
      },
      preserveScroll: true,
      forceFormData: true,
    });
  };

  const { delete: destroy } = useForm();

  const handleDelete = (id: number) => {
    destroy(route('documents.destroy', id), { preserveScroll: true });
  };

  const handleDownload = (document: Document) => {
    window.location.href = `/documents/${document.id}/download`;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const currentUser = {
    name: 'John Doe',
    role: 'admin' as const,
  }

  return (
    <div className="p-6 space-y-6">
      <TopBar currentUser={currentUser} />
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">Documents</CardTitle>
          <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" /> Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload New Document</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleUpload} className="space-y-4">
                <div>
                  <Label htmlFor="name">Document Name</Label>
                  <Input
                    id="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="related_type">Related To</Label>
                  <Select
                    value={data.related_type}
                    onValueChange={(value) => setData('related_type', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select related type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contact">Contact</SelectItem>
                      <SelectItem value="company">Company</SelectItem>
                      <SelectItem value="deal">Deal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="file">File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={e => setData('file', (e.target as HTMLInputElement).files?.[0] || null)}
                    required
                  />
                </div>
                <Button type="submit" disabled={processing}>
                  {processing ? 'Uploading...' : 'Upload'}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Related To</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((document) => (
                <TableRow key={document.id}>
                  <TableCell>{document.id}</TableCell>
                  <TableCell className="capitalize">{document.related_type}</TableCell>
                  <TableCell className="flex items-center">
                    <File className="mr-2 h-4 w-4" />
                    {document.name}
                  </TableCell>
                  <TableCell>{formatFileSize(document.size)}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDownload(document)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleDelete(document.id)}
                      >
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
    </div>
  );
}
