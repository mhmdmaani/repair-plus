//@ts-nocheck
'use client';
import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  ListItemAvatar,
  Modal,
  Dialog,
  DialogTitle,
  DialogContent,
  Avatar,
  Typography,
  Divider,
  Stack,
} from '@mui/material';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';
import {
  useAllCategories,
  useCategoriesTree,
} from '@/hooks/admin/useCategories';
import CategoryForm from '../CategoryForm';
import { FiEdit, FiEye, FiPlus } from 'react-icons/fi';
import { Category } from 'prisma/prisma-client';
import { useAllBrands } from '@/hooks/admin/useBrands';
import Link from 'next/link';

const CategoryTreeView: React.FC = () => {
  const { data: categories } = useCategoriesTree(undefined);
  const { data: allBrands } = useAllBrands();
  const [open, setOpen] = useState<{ [key: string]: boolean }>({});
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [currentParent, setCurrentParent] = useState<Category | null>(null);
  const [openForm, setOpenForm] = useState(false);

  const handleToggle = (id: string) => {
    setOpen((prevOpen) => ({ ...prevOpen, [id]: !prevOpen[id] }));
  };
  const onAdd = (cat) => {
    setCurrentParent(cat);
    setOpenForm(true);
  };

  const onEdit = (category: Category) => {
    setCurrentCategory(category);
    setOpenForm(true);
  };

  const renderTree = (nodes: Category) => (
    <div key={nodes.id}>
      <ListItem button onClick={() => handleToggle(nodes.id)}>
        <IconButton size='small'>
          {open[nodes.id] ? (
            <MdExpandLess />
          ) : nodes?.children?.length ? (
            <MdExpandMore />
          ) : (
            <div style={{ width: '22px' }} />
          )}
        </IconButton>
        <ListItemAvatar>
          {nodes?.image && nodes.image !== '' ? (
            <img
              src={nodes.image}
              alt={nodes.name}
              style={{ width: '50px', height: '50px' }}
            />
          ) : (
            <Avatar>{nodes.name.charAt(0).toUpperCase()}</Avatar>
          )}
        </ListItemAvatar>
        <ListItemText primary={nodes?.name} />
        <IconButton
          size='small'
          onClick={(e: any) => {
            e.stopPropagation();
            onEdit(nodes);
          }}
        >
          <FiEdit />
        </IconButton>

        <IconButton
          size='small'
          onClick={(e: any) => {
            e.stopPropagation();
            onAdd(nodes);
          }}
        >
          <FiPlus />
        </IconButton>

        <Link href={`/admin/categories/devices/${nodes.id}`}>
          <IconButton size='small'>
            <FiEye />
          </IconButton>
        </Link>
      </ListItem>
      <Collapse in={open[nodes.id]} timeout='auto' unmountOnExit>
        <List
          style={{
            paddingLeft: '20px',
          }}
          component='div'
        >
          {/*// @ts-ignore */}
          {nodes?.children?.map((node) => renderTree(node))}
        </List>
      </Collapse>
    </div>
  );

  return (
    <>
      <Typography variant='h4'>Categories Tree</Typography>
      {allBrands?.map((brand: any) => (
        <div
          key={brand.id}
          style={{
            marginBottom: '20px',
          }}
        >
          <Stack direction='row' alignItems='center' gap={2}>
            {brand?.logo && brand.logo !== '' ? (
              <img
                src={brand.logo}
                alt={brand.name}
                style={{ width: '50px', height: 'auto' }}
              />
            ) : (
              <Avatar>{brand.name.charAt(0).toUpperCase()}</Avatar>
            )}

            <Typography variant='h5'>{brand.name}</Typography>
          </Stack>
          <List>
            {categories
              ?.filter((c) => c.brandId === brand.id)
              ?.map((category: Category) => renderTree(category))}
          </List>
          <Divider />
        </div>
      ))}

      <Dialog
        sx={{
          width: '100%',
        }}
        open={openForm}
        onClose={() => setOpenForm(false)}
      >
        <DialogTitle>
          {currentCategory
            ? `Edit Category(${currentCategory?.name})`
            : `Add New Category`}
        </DialogTitle>
        <DialogContent
          sx={{
            width: 500,
            '@media (max-width: 600px)': {
              width: 300,
            },
          }}
        >
          <CategoryForm
            category={currentCategory}
            onAdd={() => {}}
            parentCategory={currentParent}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CategoryTreeView;
