
const vfs = {
  '/': {
    'Persons-of-Interest': {
      _type: 'dir',
      _tag: 'CATEGORY',
      'Langston-Courtney': {
        _type: 'file',
        contentFile: 'data/persons-of-interest/courtney-langston/courtney-langston.json',
        subfiles: {
          'Langston-PDA-Files': {
            _type: 'file',
            contentFile: 'data/persons-of-interest/courtney-langston/langston-pda-files.json'
          }
        }
      }
    },
    'Locations': {
      _type: 'dir',
      _tag: 'CATEGORY',
      'New-Hancheng': {
        _type: 'file',
        _tag: 'FILE',
        contentFile: 'data/locations/New-Hancheng.json',
      },
    },
    'Company-Roster': {
      _type: 'dir',
      _tag: 'CATEGORY',
      'Voodoo-1': {
        _type: 'file',
        _tag: 'FILE',
        contentFile: 'data/roster/VD1.txt',
        subfiles: {}
      },
      'Voodoo-2': {
        _type: 'file',
        _tag: 'FILE',
        contentFile: 'data/roster/VD2.json',
        subfiles: {
          'Active-Duty': {
            _type: 'dir',
            _tag: 'FOLDER',
            'Vallée-Léon': {
              _type: 'file',
              contentFile: 'data/roster/leon-valee/leon-valee.json',
              subfiles: {
                'Character-Relationships': {
                  _type: 'file',
                  _tag: "OOC",
                  contentFile: 'data/roster/leon-valee/character-relationships.json'
                },
                'Medical-Records': {
                  _type: 'dir',
                  '08-24-2180': {
                    _type: 'file',
                    contentFile: 'data/roster/leon-valee/medical-records/08-24-2180.json'
                  }
                },
                'Psychological-Background': {
                  _type: 'dir',
                  'Background': {
                    _type: 'file',
                    contentFile: 'data/roster/leon-valee/psychologial-background/background.json'
                  }
                },
                'Service-Record': {
                  _type: 'dir',
                  '08-09-2180': {
                    _type: 'file',
                    contentFile: 'data/roster/leon-valee/service-record/08-09-2180.json'
                  }
                }
              }
            },
            'Knight-Bodhi': {
              _type: 'file',
              contentFile: 'data/roster/bodhi-knight/bodhi-knight.json',
              subfiles: {
                'Character-Relationships': {
                  _type: 'file',
                  _tag: 'OOC',
                  contentFile: 'data/roster/bodhi-knight/character-relationships.json'
                },
                'Medical-Records': {
                  _type: 'dir',
                  '09-02-2180': {
                    _type: 'file',
                    contentFile: 'data/roster/bodhi-knight/medical-records/09-02-2180.json'
                  }
                },
                'Psychological-Background': {
                  _type: 'dir',
                  'Upbringing': {
                    _type: 'file',
                    contentFile: 'data/roster/bodhi-knight/psychologial-background/upbringing.json'
                  },
                  'Early-Adulthood': {
                    _type: 'file',
                    contentFile: 'data/roster/bodhi-knight/psychologial-background/early-adulthood.json'
                  },
                  'Present': {
                    _type: 'file',
                    contentFile: 'data/roster/bodhi-knight/psychologial-background/present.json'
                  }
                },
                'Service-Record': {
                  _type: 'dir',
                  '07-04-2180': {
                    _type: 'file',
                    contentFile: 'data/roster/bodhi-knight/service-record/07-04-2180.json'
                  },
                  '07-13-2180': {
                    _type: 'file',
                    contentFile: 'data/roster/bodhi-knight/service-record/07-13-2180.json'
                  },
                  '09-02-2180': {
                    _type: 'file',
                    contentFile: 'data/roster/bodhi-knight/service-record/09-02-2180.json'
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

export default vfs;