import express from 'express';
import { createFranchiseEnquiry, getAllFranchiseEnquiries, deleteFranchiseEnquiry } from '../controllers/franchise.Controller.js';

const router = express.Router();

// POST /api/franchise
router.post('/', createFranchiseEnquiry);

// GET /api/franchise
router.get('/', getAllFranchiseEnquiries);

// DELETE /api/franchise/:id
router.delete('/:id', deleteFranchiseEnquiry);

export default router;
