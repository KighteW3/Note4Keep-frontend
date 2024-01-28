let SessionLoad = 1
let s:so_save = &g:so | let s:siso_save = &g:siso | setg so=0 siso=0 | setl so=-1 siso=-1
let v:this_session=expand("<sfile>:p")
silent only
silent tabonly
cd ~/Dev/projects/note4keep/frontend
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
let s:shortmess_save = &shortmess
if &shortmess =~ 'A'
  set shortmess=aoOA
else
  set shortmess=aoO
endif
badd +151 src/routes/SpecificNote.tsx
badd +153 src/scss/SpecificNote.scss
badd +136 src/routes/Notes.tsx
badd +1 src/scss/Login.scss
badd +45 src/routes/Login.tsx
badd +26 src/scss/AuthInterface.scss
badd +1 src/assets/Icons.tsx
badd +1 src/scss/App.scss
badd +34 src/components/NavBar.tsx
badd +1 src/hooks/useAuth.tsx
badd +9 src/components/Loading.tsx
badd +1 src/scss/Loading.scss
badd +50 src/routes/Register.tsx
badd +3 src/scss/NotePreview.scss
badd +1 src/components/NotePageNav.tsx
badd +1 src/components/NotePreview.tsx
badd +3 src/scss/Notes.scss
badd +117 src/routes/SearchNotes.tsx
badd +1 src/scss/SearchNotes.scss
badd +33 src/App.tsx
badd +1 src/routes/Home.tsx
badd +22 src/store/userInfo.ts
badd +52 src/scss/Home.scss
badd +5 src/components/Footer.tsx
badd +2 src/scss/Footer.scss
badd +21 src/routes/Profile.tsx
badd +41 src/scss/Profile.scss
argglobal
%argdel
edit src/routes/Profile.tsx
let s:save_splitbelow = &splitbelow
let s:save_splitright = &splitright
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
let &splitbelow = s:save_splitbelow
let &splitright = s:save_splitright
wincmd t
let s:save_winminheight = &winminheight
let s:save_winminwidth = &winminwidth
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 113 + 79) / 158)
exe 'vert 2resize ' . ((&columns * 44 + 79) / 158)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 28 - ((26 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 28
normal! 044|
lcd ~/Dev/projects/note4keep/frontend
wincmd w
argglobal
if bufexists(fnamemodify("~/Dev/projects/note4keep/frontend/src/scss/Profile.scss", ":p")) | buffer ~/Dev/projects/note4keep/frontend/src/scss/Profile.scss | else | edit ~/Dev/projects/note4keep/frontend/src/scss/Profile.scss | endif
if &buftype ==# 'terminal'
  silent file ~/Dev/projects/note4keep/frontend/src/scss/Profile.scss
endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let &fdl = &fdl
let s:l = 41 - ((19 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 41
normal! 0
lcd ~/Dev/projects/note4keep/frontend
wincmd w
exe 'vert 1resize ' . ((&columns * 113 + 79) / 158)
exe 'vert 2resize ' . ((&columns * 44 + 79) / 158)
tabnext 1
if exists('s:wipebuf') && len(win_findbuf(s:wipebuf)) == 0 && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20
let &shortmess = s:shortmess_save
let &winminheight = s:save_winminheight
let &winminwidth = s:save_winminwidth
let s:sx = expand("<sfile>:p:r")."x.vim"
if filereadable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &g:so = s:so_save | let &g:siso = s:siso_save
nohlsearch
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
