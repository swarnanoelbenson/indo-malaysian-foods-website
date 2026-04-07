import {
  Workshop,
  Recipe,
  Video,
  About,
  Committee,
  University,
  ServiceResult,
} from '../types';

const API_KEY = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
const SHEET_ID = process.env.REACT_APP_GOOGLE_SHEETS_ID;

const RANGES = {
  workshops: process.env.REACT_APP_WORKSHEETS_RANGE ?? 'Workshops!A:I',
  recipes: process.env.REACT_APP_RECIPES_RANGE ?? 'Recipes!A:K',
  videos: process.env.REACT_APP_VIDEOS_RANGE ?? 'Videos!A:G',
  about: process.env.REACT_APP_ABOUT_RANGE ?? 'About!A:F',
  committee: process.env.REACT_APP_COMMITTEE_RANGE ?? 'Committee!A:F',
  universities: process.env.REACT_APP_UNIVERSITIES_RANGE ?? 'Universities!A:E',
};

// Fetches a sheet range and returns raw 2D array (first row = headers)
async function fetchSheet(range: string): Promise<string[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}?key=${API_KEY}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`);
  }
  const data = await response.json();
  return data.values ?? [];
}

// Converts a 2D array (headers + rows) into an array of plain objects
function parseRows(rows: string[][]): Record<string, string>[] {
  if (rows.length < 2) return [];
  const [headers, ...dataRows] = rows;
  return dataRows.map((row) => {
    const obj: Record<string, string> = {};
    headers.forEach((header, i) => {
      obj[header.trim()] = row[i] ?? '';
    });
    return obj;
  });
}

function splitPipe(value: string): string[] {
  return value ? value.split('|').map((s) => s.trim()).filter(Boolean) : [];
}

function splitSemicolon(value: string): string[] {
  return value ? value.split(';').map((s) => s.trim()).filter(Boolean) : [];
}

// ─── Public fetch functions ───────────────────────────────────────────────────

export async function fetchWorkshops(): Promise<ServiceResult<Workshop>> {
  try {
    const rows = await fetchSheet(RANGES.workshops);
    const records = parseRows(rows);
    return records.map((r): Workshop => ({
      id: r.id,
      title: r.title,
      date: r.date,
      description: r.description,
      fullDescription: r.fullDescription,
      capacity: Number(r.capacity) || 0,
      location: r.location,
      imageUrls: splitPipe(r.imageUrls),
      registrationLink: r.registrationLink,
    }));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[fetchWorkshops]', message);
    return { error: message };
  }
}

export async function fetchRecipes(): Promise<ServiceResult<Recipe>> {
  try {
    const rows = await fetchSheet(RANGES.recipes);
    const records = parseRows(rows);
    return records.map((r): Recipe => ({
      id: r.id,
      name: r.name,
      difficulty: r.difficulty,
      prepTime: Number(r.prepTime) || 0,
      cookTime: Number(r.cookTime) || 0,
      servings: Number(r.servings) || 0,
      description: r.description,
      ingredients: splitPipe(r.ingredients),
      instructions: r.instructions,
      imageUrls: splitPipe(r.imageUrls),
      cuisine: r.cuisine,
    }));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[fetchRecipes]', message);
    return { error: message };
  }
}

export async function fetchVideos(): Promise<ServiceResult<Video>> {
  try {
    const rows = await fetchSheet(RANGES.videos);
    const records = parseRows(rows);
    return records.map((r): Video => ({
      id: r.id,
      title: r.title,
      youtubeId: r.youtubeId,
      speaker: r.speaker,
      description: r.description,
      uploadDate: r.uploadDate,
      tags: r.tags,
    }));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[fetchVideos]', message);
    return { error: message };
  }
}

export async function fetchAbout(): Promise<ServiceResult<About>> {
  try {
    const rows = await fetchSheet(RANGES.about);
    const records = parseRows(rows);
    return records.map((r): About => ({
      id: r.id,
      section: r.section,
      heading: r.heading,
      content: r.content,
      imageUrls: splitPipe(r.imageUrls),
      order: Number(r.order) || 0,
    }));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[fetchAbout]', message);
    return { error: message };
  }
}

export async function fetchCommittees(): Promise<ServiceResult<Committee>> {
  try {
    const rows = await fetchSheet(RANGES.committee);
    const records = parseRows(rows);
    return records.map((r): Committee => ({
      id: r.id,
      name: r.name,
      role: r.role,
      bio: r.bio,
      imageUrl: r.imageUrl,
      university: r.university,
    }));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[fetchCommittees]', message);
    return { error: message };
  }
}

export async function fetchUniversities(): Promise<ServiceResult<University>> {
  try {
    const rows = await fetchSheet(RANGES.universities);
    const records = parseRows(rows);
    return records.map((r): University => ({
      id: r.id,
      name: r.name,
      logoUrl: r.logoUrl,
      description: r.description,
      website: r.website,
    }));
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error('[fetchUniversities]', message);
    return { error: message };
  }
}
