# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Changed

- **Refactored TourForm architecture** — simplified form code with clean component structure
  - Each form section is now a separate component (TitlesSection, SlugSection, etc.)
  - Removed complex form abstractions (FormField, FormControl, FormItem, FormLabel, FormMessage)
  - Simplified validation schema — only types and required fields
  - All components follow the 100-line limit rule
- **Localized admin UI** — all admin form labels/toasts now use translation keys with full-path `useTranslations` lookups; added missing admin/auth keys across locales
- **Auth UX tweaks** — login redirects to `/admin`, login buttons hidden from public views, logout only when authenticated

### Removed

- Deleted `src/components/ui/Form.tsx` and `src/components/ui/form/` directory
- Deleted `src/components/admin/TourFormFields.tsx`
- Deleted `src/components/admin/tourFormFieldsConfig.ts`
- Deleted `src/components/admin/tourFormSchema.ts` (replaced with simplified `tourSchema.ts`)

### Added

- `src/components/admin/FormField.tsx` — simple reusable form field component
- `src/components/admin/tourSchema.ts` — zod schema with minimal validations
- `src/components/admin/tour-form/` — directory with form section components:
  - `TitlesSection.tsx`
  - `SlugSection.tsx`
  - `DescriptionsSection.tsx`
  - `MetricsSection.tsx`
  - `GroupSizeSection.tsx`
  - `VerticalDropSection.tsx`
  - `EquipmentSection.tsx`
  - `ActiveSection.tsx`
  - `types.ts` — shared TypeScript types
  - `index.ts` — barrel export
- **Auth plumbing** — Supabase auth provider/controls, login page, admin guard redirecting unauthenticated users to `/login`, `.env.example` vars for Supabase
