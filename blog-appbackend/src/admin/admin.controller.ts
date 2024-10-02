import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users') // Get all bloggers
  findAll() {
    return this.adminService.findAll();
  }
  // Get a specific user by ID
  @Get('user/:id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  //update via id
  @Patch('update-user/:id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete('remove-user/:id') // Remove a specific user by ID
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }

  @Patch('user/toggle-active/:id')
  toggleActiveStatus(@Param('id') id: string) {
    return this.adminService.toggleActiveStatus(+id);
  }
}
