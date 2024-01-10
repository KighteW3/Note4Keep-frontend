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
badd +134 src/routes/SpecificNote.tsx
badd +102 src/scss/SpecificNote.scss
badd +30 src/routes/Notes.tsx
badd +1 src/scss/Login.scss
badd +28 src/routes/Login.tsx
argglobal
%argdel
edit src/routes/SpecificNote.tsx
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
exe 'vert 1resize ' . ((&columns * 109 + 79) / 158)
exe 'vert 2resize ' . ((&columns * 48 + 79) / 158)
argglobal
balt src/routes/Login.tsx
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
let s:l = 130 - ((15 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 130
normal! 063|
lcd ~/Dev/projects/note4keep/frontend
wincmd w
argglobal
if bufexists(fnamemodify("~/Dev/projects/note4keep/frontend/src/scss/SpecificNote.scss", ":p")) | buffer ~/Dev/projects/note4keep/frontend/src/scss/SpecificNote.scss | else | edit ~/Dev/projects/note4keep/frontend/src/scss/SpecificNote.scss | endif
if &buftype ==# 'terminal'
  silent file ~/Dev/projects/note4keep/frontend/src/scss/SpecificNote.scss
endif
balt ~/Dev/projects/note4keep/frontend/src/routes/SpecificNote.tsx
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
let s:l = 117 - ((31 * winheight(0) + 19) / 38)
if s:l < 1 | let s:l = 1 | endif
keepjumps exe s:l
normal! zt
keepjumps 117
normal! 025|
wincmd w
exe 'vert 1resize ' . ((&columns * 109 + 79) / 158)
exe 'vert 2resize ' . ((&columns * 48 + 79) / 158)
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
